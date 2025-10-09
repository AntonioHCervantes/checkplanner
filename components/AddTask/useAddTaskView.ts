'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Language } from '../../lib/i18n';
import { Tag } from '../../lib/types';
import useDialogFocusTrap from '../../lib/useDialogFocusTrap';

interface Options {
  title: string;
  setTitle: (value: string | ((prev: string) => string)) => void;
  existingTags: Tag[];
  language: Language;
}

type SpeechRecognitionInstance = {
  lang: string;
  start: () => void;
  stop: () => void;
  interimResults: boolean;
  onresult:
    | ((event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void)
    | null;
  onspeechend: (() => void) | null;
  onend: (() => void) | null;
};

const SPEECH_LANGUAGE_MAP: Record<Language, string> = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  it: 'it-IT',
  de: 'de-DE',
};

export default function useAddTaskView({
  title,
  setTitle,
  existingTags,
  language,
}: Options) {
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const titleRef = useRef(title);
  const initialTitleRef = useRef('');
  const [isListening, setIsListening] = useState(false);
  const [showVoiceWarning, setShowVoiceWarning] = useState(false);
  const voiceWarningRef = useRef<HTMLDivElement | null>(null);
  const voiceWarningCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    titleRef.current = title;
  }, [title]);

  const getSpeechRecognition = useCallback(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const SpeechRecognitionConstructor =
      (
        window as unknown as {
          SpeechRecognition?: new () => SpeechRecognitionInstance;
        }
      ).SpeechRecognition ??
      (
        window as unknown as {
          webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
        }
      ).webkitSpeechRecognition ??
      null;

    if (!SpeechRecognitionConstructor) {
      return null;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognitionConstructor();
      recognition.interimResults = false;
      recognition.onresult = event => {
        const transcript = event.results[0][0].transcript;
        setTitle(prev => (prev ? `${prev} ${transcript}` : transcript));
        recognition.stop();
      };
      recognition.onspeechend = () => {
        recognition.stop();
      };
      recognition.onend = () => {
        setIsListening(false);
        if (initialTitleRef.current === titleRef.current) {
          setShowVoiceWarning(true);
        }
      };
      recognitionRef.current = recognition;
    }

    return recognitionRef.current;
  }, [setTitle]);

  const handleVoiceInput = useCallback(() => {
    const recognition = getSpeechRecognition();

    if (!recognition) {
      return;
    }

    recognition.lang = SPEECH_LANGUAGE_MAP[language] || language;

    setIsListening(prev => {
      if (prev) {
        recognition.stop();
        return false;
      }

      setShowVoiceWarning(false);
      initialTitleRef.current = titleRef.current;
      recognition.start();
      return true;
    });
  }, [getSpeechRecognition, language]);

  const closeVoiceWarning = useCallback(() => {
    setShowVoiceWarning(false);
  }, []);

  const getTagColor = useCallback(
    (tagLabel: string) => {
      const tag = existingTags.find(t => t.label === tagLabel);
      return tag ? tag.color : '#ccc';
    },
    [existingTags]
  );

  const {
    onFocusStartGuard: onVoiceWarningFocusStartGuard,
    onFocusEndGuard: onVoiceWarningFocusEndGuard,
  } = useDialogFocusTrap(showVoiceWarning, voiceWarningRef, {
    initialFocusRef: voiceWarningCloseButtonRef,
  });

  return {
    state: {
      isListening,
      showVoiceWarning,
      voiceWarningRef,
      voiceWarningCloseButtonRef,
    },
    actions: {
      handleVoiceInput,
      closeVoiceWarning,
      getTagColor,
      onVoiceWarningFocusStartGuard,
      onVoiceWarningFocusEndGuard,
    },
  } as const;
}
