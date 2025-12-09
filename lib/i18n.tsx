'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export type Language = 'en' | 'es' | 'fr' | 'it' | 'de';

export const LANGUAGES: Language[] = ['en', 'es', 'fr', 'it', 'de'];

const translations: Record<Language, any> = {
  en: {
    nav: { myDay: 'My Day', myTasks: 'My Tasks' },
    actions: {
      export: 'Export',
      import: 'Import',
      clearAll: 'Clear all',
      toggleTheme: 'Toggle theme',
      language: 'Select language',
      more: 'More actions',
      settings: 'Settings',
      workSchedule: 'Work schedule',
      removeTag: 'Remove tag',
      addTag: 'Add tag',
      favoriteTag: 'Add tag to favorites',
      unfavoriteTag: 'Remove tag from favorites',
      close: 'Close',
      cancel: 'Cancel',
      notifications: 'Notifications',
    },
    confirmDelete: {
      message:
        'Are you sure you want to delete the dashboard? We recommend exporting it so you can restore your work later by importing the dashboard.',
      cancel: 'Cancel',
      delete: 'Delete',
    },
    board: { todo: 'To Do', doing: 'In Progress', done: 'Done' },
    lists: {
      ideas: 'Ideas',
      backlog: 'Backlog',
      inprogress: 'In Progress',
      done: 'Done',
    },
    addTask: {
      titleLabel: 'Title',
      titlePlaceholder: 'New task',
      tagsLabel: 'Tags',
      tagsPlaceholder: 'Add tags (press Enter)',
      priorityLabel: 'Priority',
      addButton: 'Add',
      voiceInput: 'Add by voice',
      voiceInputNoText:
        'No text was captured. Please try again and make sure to speak in the selected language.',
    },
    taskCard: {
      markInProgress: 'Move to In Progress',
      markDone: 'Mark as done',
      deleteTask: 'Delete task',
      showTimer: 'Plan time',
      setMainTask: 'Mark as main task',
      unsetMainTask: 'Remove main task status',
      mainTaskTooltip: 'Main task of the day',
    },
    taskItem: {
      removeMyDay: 'Remove from My Day',
      addMyDay: 'Add to My Day',
      deleteTask: 'Delete task',
      tagPlaceholder: 'Add tag',
      myDayHelp: 'Plan your daily work by adding tasks to My Day.',
      recurring: {
        button: 'Repeat every week',
        buttonWithDays: 'Repeats: {days}',
        description: 'Select the weekdays when this task should repeat.',
        limitedBySchedule:
          'Showing only the days configured in your work schedule.',
        autoAddHint:
          'On those days the task will be added to My Day automatically.',
        remove: 'Remove weekly repetition',
        weekdaysShort: {
          monday: 'Mon',
          tuesday: 'Tue',
          wednesday: 'Wed',
          thursday: 'Thu',
          friday: 'Fri',
          saturday: 'Sat',
          sunday: 'Sun',
        },
      },
    },
    myDayPage: {
      empty: 'No tasks added to My Day',
      goToMyTasks: 'Go to My Tasks',
      progress: {
        full: "Big day ahead—let's get started!",
        medium: "You're making progress—keep going!",
        low: 'Almost there—keep it up!',
        done: 'All tasks completed! Great job!',
        clearCompleted: 'Remove completed tasks',
      },
    },
    timer: {
      start: 'Start timer',
      pause: 'Pause timer',
      finished: 'Time for "{task}" finished',
    },
    priority: { low: 'Low', medium: 'Medium', high: 'High' },
    taskList: {
      noTasks: 'No tasks',
      noTasksIntro: 'Check your plan. Check your day.',
      exploreDemoTemplates: 'Explore demo templates',
    },
    dnd: {
      keyboardInstructions:
        'Press space to pick up a task, use the arrow keys to move it, press space again to drop it, or press Escape to cancel.',
    },
    tasksView: {
      mobileAddTask: {
        show: 'Add task',
      },
    },
    tagFilter: {
      showAll: 'Show all',
      activeIndicator: '(active)',
      confirmDelete:
        'Some tasks are using this tag. If you remove it, those tasks will lose the tag. Continue?',
      tabsLabel: 'Filter tasks by tag',
    },
    welcomeModal: {
      title: 'CheckPlanner',
      p1: 'Improve your productivity, plan your tasks and organize your daily work.',
      p2: 'Your data is stored locally, nothing is sent to any server.',
      p3: 'Export your data to make local backups from time to time.',
      p4: 'Designed for personal use, not for teams.',
      p5: '100% free and unlimited, open source.',
      cta: "Let's go!",
    },
    notifications: {
      title: 'Notifications',
      empty: 'No notifications',
      dismiss: 'Dismiss notification',
      welcome: {
        title: 'Welcome to CheckPlanner',
        description:
          'Use the "My Tasks" board to collect and prioritize everything you need to do. Move items into "My Day" when you are ready to focus on them. Open settings to switch theme, export your data and more.',
        installCta: 'Install app',
        installUnavailable:
          'Install is only available in supported browsers. Try using the browser menu to add CheckPlanner to your device.',
        installInstalled: 'App already installed',
        demoCta: 'Explore demo templates',
      },
      workScheduleSuggestion: {
        title: 'Add your work schedule',
        description:
          'Save your working hours so you can enable a planning reminder before the end of each workday, plan tomorrow ahead of time, and start the day productively.',
        cta: 'Set work schedule',
      },
      workReminder: {
        title: 'Plan tomorrow',
        description:
          'Your workday is about to finish. Review your progress and decide what comes next.',
      },
      timerFinished: {
        title: 'Planned time finished',
        description: 'A planned time has finished.',
        untitledTask: 'Untitled task',
      },
    },
    settingsPage: {
      title: 'Settings',
      subtitle: 'Personalize CheckPlanner',
      description:
        'Manage language, theme, work preferences, and alerts from a single workspace.',
      badges: { current: 'Active' },
      sections: {
        general: { title: 'General', description: 'Language and data' },
        appearance: { title: 'Appearance', description: 'Theme and layout' },
        workSchedule: {
          title: 'Work schedule',
          description: 'Availability and reminders',
        },
        notifications: {
          title: 'Notifications',
          description: 'Alerts and preferences',
        },
      },
      general: {
        language: {
          title: 'Language',
          description: 'Choose the language you want to use in the app.',
        },
        data: {
          title: 'Data & backups',
          description: 'Import, export, or reset your planner safely.',
          importHelper: 'Restore a previous backup (.json).',
          exportHelper: 'Download a copy of your current data.',
          clearHelper:
            'This will delete all tasks, tags, timers, and preferences.',
        },
      },
      appearance: {
        theme: {
          title: 'Theme',
          description: 'Pick the mode that matches your workspace.',
          light: 'Light mode',
          lightDescription: 'Bright, clean interface for daytime focus.',
          dark: 'Dark mode',
          darkDescription: 'Dimmed interface to reduce eye strain.',
          active: 'Active',
        },
      },
      workSchedule: {
        title: 'Work schedule',
        description: 'Set your working hours and reminders.',
        helper:
          'Keep your daily availability up to date to improve reminders and recurring tasks.',
        cta: 'Manage work schedule',
      },
      notifications: {
        title: 'Notifications',
        description: 'Control how you stay informed.',
        helper:
          'Review unread alerts or fine-tune preferences in the notifications page.',
        cta: 'Open notifications',
        soundPreferences: {
          title: 'Notification sounds',
          description:
            'Choose whether to play sounds and pick a tone for each type of alert.',
          toggleLabel: 'Toggle sound',
          selectLabel: 'Sound',
          timerFinished: {
            title: 'Planned time finished',
            description: 'Alert when a task planning timer ends.',
          },
          workdayReminder: {
            title: 'End of workday reminder',
            description:
              'Reminder to wrap up the day and plan the next tasks before finishing.',
          },
        },
        soundOptions: {
          chime: 'Gentle chime',
          bell: 'Classic bell',
          digital: 'Digital ping',
          pulse: 'Soft pulse',
          spark: 'Sparkle tone',
        },
      },
    },
    workSchedulePage: {
      title: 'Work schedule',
      intro:
        'Save your working hours so CheckPlanner can adapt to your workday.',
      calendar: {
        instructions:
          'Click and drag over the half-hour slots to mark when your workday starts and ends each day.',
        timeLabel: 'Time',
      },
      week: {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
      },
      actions: {
        title: 'Available actions',
        planningReminder: {
          title: 'Reminder to plan tomorrow',
          description:
            'Receive a reminder shortly before your workday ends so you can organize the next day.',
          selectLabel: 'Notify me',
          selectSuffix: 'before the end of my workday',
          selectHelper:
            'Select how long before finishing you want to receive the reminder.',
          minutes: {
            '5': '5m',
            '15': '15m',
            '30': '30m',
            '60': '1h',
          },
          switchLabel: 'Enable reminder',
          fillScheduleFirst:
            'Set your work schedule before activating this reminder.',
        },
      },
      reminder: {
        toast: 'Your workday is about to end. Take a moment to plan tomorrow.',
      },
    },
    footer: {
      about: 'About',
      openSource: 'Open Source',
      faqs: 'FAQs & Support',
      demoTemplates: 'Demo templates',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    demoTemplatesPage: {
      title: 'Demo Templates',
      intro:
        'Import these incredible examples of how different professionals can use CheckPlanner.',
      confirmExistingTitle: 'Back up your tasks before importing',
      confirmExistingDescription:
        'You already have tasks or filters saved. Importing a demo template will replace your current data. Export your tasks first to avoid losing progress. In Settings you will find options to Export, Import, or Delete everything.',
      confirmExistingExportCta: 'Export tasks',
      confirmExistingContinueCta: 'Import demo anyway',
      successTitle: 'Demo template imported successfully',
      successDescription:
        'Your workspace has been populated with demo data. Explore the tasks to see how CheckPlanner supports this role.',
      successRoleLabel: 'Role demo:',
      viewDemoCta: 'View demo',
      roles: {
        techLead: {
          title: 'Technical Lead',
          description:
            'As a Technical Lead you coordinate incidents, code reviews, system monitoring, and long-term initiatives while keeping the team aligned.',
          importCta: 'Import demo template',
        },
        architect: {
          title: 'Architect',
          description:
            'Architects balance concept development, consultant coordination, site observations, and permit documentation while steering design decisions.',
          importCta: 'Import demo template',
        },
        graphicDesigner: {
          title: 'Graphic Designer',
          description:
            'Graphic Designers juggle concepting, production, feedback rounds, and brand stewardship across digital and print touchpoints.',
          importCta: 'Import demo template',
        },
        marketingDirector: {
          title: 'Marketing Director',
          description:
            'Marketing Directors orchestrate campaigns, analyze performance, align teams, and report outcomes to leadership.',
          importCta: 'Import demo template',
        },
        productManager: {
          title: 'Product Manager',
          description:
            'Product Managers connect discovery insights, stakeholder alignment, delivery execution, and metrics to drive product impact.',
          importCta: 'Import demo template',
        },
      },
    },
    aboutPage: {
      title: 'About CheckPlanner',
      intro:
        'CheckPlanner is a free app built to boost your personal productivity at work.',
      features: {
        freeOpenSource: '100% free and open source.',
        privacy:
          'All information stays local; nothing is sent to servers or third parties. Use it only on your private devices.',
        fast: 'Fast and registration-free; everything is stored in your browser and no data is shared.',
        personal: 'Focused on personal use—no accounts or team features.',
        export:
          'Export and import your data to create backups or move to another device.',
        myTasks:
          'Add tasks in an organized way, tagging them as needed and assigning priorities.',
        myDay:
          'Plan your daily work by selecting which tasks you want to do each day.',
      },
      sourceCode: 'The source code is available on',
      learnMore: 'Learn more in our',
      and: 'and',
    },
    faqs: {
      title: 'Frequently Asked Questions',
      intro:
        'Find answers to common questions about how to make the most of CheckPlanner.',
      q1: {
        question: 'What is CheckPlanner?',
        answer:
          'CheckPlanner is a personal productivity app designed to keep your daily work organized entirely in your browser, combining simple planning boards with quick actions that help you stay focused.',
      },
      q2: {
        question: 'How much does CheckPlanner cost?',
        answer:
          'CheckPlanner is completely free to use, offers unlimited planning, and is published as open-source software so you can review or extend it whenever you want.',
      },
      q3: {
        question: 'Is there a user registration or sign-in?',
        answer:
          'No account is required. CheckPlanner works privately on your device, loads instantly, and keeps everything fast and distraction-free without any sign-up flow.',
      },
      q4: {
        question: 'Where is my data stored?',
        answer:
          'Every task, board preference, and setting is stored locally in your browser. Nothing leaves your device, and you can export your workspace at any time to create backups.',
      },
      q5: {
        question: 'Is my information shared with third parties?',
        answer:
          'No. CheckPlanner never sends analytics, telemetry, or task data to external services—everything remains local on your device.',
      },
      q6: {
        question: 'Can I continue planning on another device?',
        answer:
          'Yes. Export your current plan to a JSON file and import it on another device to pick up exactly where you left off.',
      },
      q7: {
        question: 'Are there keyboard shortcuts to manage my tasks?',
        answer:
          'Yes. While in My Day, press the spacebar to select a task and use the arrow keys to move it through the workflow instantly.',
      },
      q8: {
        question: 'Can I change the theme or language?',
        answer:
          'Yes. Use the header controls or open Settings to toggle between light and dark modes and choose the language you prefer.',
      },
      supportTitle: 'Support',
      support:
        'Need more help? Use our GitHub issues to report problems or suggestions.',
      supportLink: 'Open an issue',
    },

    privacyPage: {
      title: 'Privacy Policy',
      intro:
        'CheckPlanner is a client-side application. We respect your privacy and do not collect personal data.',
      localData: {
        title: 'Local Data',
        description:
          'All lists, custom columns and task states are processed directly in your browser with no account required. We keep this information in the browser local storage alongside preferences like language, theme and tips you have dismissed. The data stays on your device unless you export it or clear it manually, such as by wiping the browser cache or using the in-app reset actions.',
      },
      analytics: {
        title: 'Analytics',
        description:
          'The application does not use analytics or tracking cookies.',
      },
      contact: {
        title: 'Contact',
        description: 'If you have questions, reach out through GitHub issues.',
      },
    },
    termsPage: {
      title: 'Terms of Service',
      intro: 'By using CheckPlanner, you agree to the following terms.',
      usage: {
        title: 'Use of the Application',
        description:
          'The app is provided “as is” without warranties. You are responsible for your data.',
      },
      privacy: {
        title: 'Privacy',
        description: 'For information about data handling, please review our',
      },
      liability: {
        title: 'Limitation of Liability',
        description:
          'We are not liable for any damages or data loss resulting from the use of the app.',
      },
      changes: {
        title: 'Changes to These Terms',
        description:
          'We may update these terms at any time. Continued use of the app constitutes acceptance of the new terms.',
      },
      contact: {
        title: 'Contact',
        description: 'If you have questions, reach out through GitHub issues.',
      },
    },
    lang: {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      it: 'Italian',
      de: 'German',
    },
  },
  es: {
    nav: { myDay: 'Mi Día', myTasks: 'Mis Tareas' },
    actions: {
      export: 'Exportar',
      import: 'Importar',
      clearAll: 'Eliminar todo',
      toggleTheme: 'Cambiar tema',
      language: 'Seleccionar idioma',
      more: 'Más acciones',
      settings: 'Ajustes',
      workSchedule: 'Jornada laboral',
      removeTag: 'Eliminar etiqueta',
      addTag: 'Añadir etiqueta',
      favoriteTag: 'Marcar etiqueta como favorita',
      unfavoriteTag: 'Quitar etiqueta de favoritas',
      close: 'Cerrar',
      cancel: 'Cancelar',
      notifications: 'Notificaciones',
    },
    confirmDelete: {
      message:
        '¿Seguro que quieres borrar el panel? Recomendamos exportarlo para que puedas restaurar tu trabajo más tarde importando el panel.',
      cancel: 'Cancelar',
      delete: 'Eliminar',
    },
    board: { todo: 'Por hacer', doing: 'En progreso', done: 'Hecho' },
    lists: {
      ideas: 'Ideas',
      backlog: 'Pendientes',
      inprogress: 'En Progreso',
      done: 'Hecho',
    },
    addTask: {
      titleLabel: 'Título',
      titlePlaceholder: 'Nueva tarea',
      tagsLabel: 'Etiquetas',
      tagsPlaceholder: 'Añade etiquetas (presiona Enter)',
      priorityLabel: 'Prioridad',
      addButton: 'Añadir',
      voiceInput: 'Añadir por voz',
      voiceInputNoText:
        'No se ha capturado texto. Vuelve a intentarlo y asegúrate de hablar en el idioma seleccionado.',
    },
    taskCard: {
      markInProgress: 'Mover a En progreso',
      markDone: 'Marcar como completada',
      deleteTask: 'Eliminar tarea',
      showTimer: 'Planificar tiempo',
      setMainTask: 'Marcar como tarea principal',
      unsetMainTask: 'Quitar tarea principal',
      mainTaskTooltip: 'Tarea principal del día',
    },
    taskItem: {
      removeMyDay: 'Quitar de Mi Día',
      addMyDay: 'Agregar a Mi Día',
      deleteTask: 'Eliminar tarea',
      tagPlaceholder: 'Añadir etiqueta',
      myDayHelp: 'Planifica tu trabajo diario añadiendo tareas a Mi Día.',
      recurring: {
        button: 'Repetir cada semana',
        buttonWithDays: 'Se repite: {days}',
        description:
          'Selecciona los días en los que quieres repetir esta tarea.',
        limitedBySchedule:
          'Mostramos solo los días incluidos en tu jornada laboral.',
        autoAddHint:
          'Los días seleccionados la tarea se añadirá a Mi Día automáticamente.',
        remove: 'Quitar repetición semanal',
        weekdaysShort: {
          monday: 'L',
          tuesday: 'M',
          wednesday: 'X',
          thursday: 'J',
          friday: 'V',
          saturday: 'S',
          sunday: 'D',
        },
      },
    },
    myDayPage: {
      empty: 'No hay tareas añadidas a Mi Día',
      goToMyTasks: 'Ir a Mis Tareas',
      progress: {
        full: '¡Qué gran día, a por ello!',
        medium: '¡Buen progreso, sigue así!',
        low: '¡Ánimo, ya falta poco!',
        done: '¡Todo hecho, gran trabajo!',
        clearCompleted: 'Eliminar tareas completadas',
      },
    },
    timer: {
      start: 'Iniciar temporizador',
      pause: 'Pausar temporizador',
      finished: 'Tiempo para "{task}" terminado',
    },
    priority: { low: 'Baja', medium: 'Media', high: 'Alta' },
    taskList: {
      noTasks: 'No hay tareas',
      noTasksIntro: 'Check your plan. Check your day.',
      exploreDemoTemplates: 'Explorar plantillas demo',
    },
    dnd: {
      keyboardInstructions:
        'Pulsa la barra espaciadora para seleccionar una tarea, usa las flechas para moverla, vuelve a pulsar espacio para soltarla o pulsa Escape para cancelar.',
    },
    tasksView: {
      mobileAddTask: {
        show: 'Añadir tarea',
      },
    },
    tagFilter: {
      showAll: 'Mostrar todas',
      activeIndicator: '(activo)',
      confirmDelete:
        'Algunas tareas usan esta etiqueta. Si la eliminas, esas tareas perderán la etiqueta. ¿Continuar?',
      tabsLabel: 'Filtrar tareas por etiqueta',
    },
    welcomeModal: {
      title: 'CheckPlanner',
      p1: 'Mejora tu productividad, planifica tus tareas y organiza tu trabajo diario.',
      p2: 'Tus datos se almacenan en local, no se envían a ningún servidor.',
      p3: 'Exporta tus datos para hacer copias de seguridad en local cada cierto tiempo.',
      p4: 'Diseñado para uso personal, no para equipos.',
      p5: '100% gratis e ilimitado, open source.',
      cta: '¡Vamos!',
    },
    notifications: {
      title: 'Notificaciones',
      empty: 'Sin notificaciones',
      dismiss: 'Cerrar notificación',
      welcome: {
        title: '¡Hola! Te damos la bienvenida a CheckPlanner',
        description:
          'Usa el tablero "Mis Tareas" para reunir y priorizar todo lo que debes hacer. Pasa los elementos a "Mi Día" cuando quieras enfocarte en ellos. Abre los ajustes para cambiar el tema, exportar tus datos y más.',
        installCta: 'Instalar app',
        installUnavailable:
          'La instalación solo está disponible en navegadores compatibles. Usa el menú del navegador para añadir CheckPlanner a tu dispositivo.',
        installInstalled: 'La app ya está instalada',
        demoCta: 'Ver plantillas de demostración',
      },
      workScheduleSuggestion: {
        title: 'Añade tu jornada laboral',
        description:
          'Guarda tu horario laboral para activar un aviso de planificación antes de que termine cada jornada, preparar el trabajo del día siguiente y empezar de forma productiva.',
        cta: 'Configurar jornada laboral',
      },
      workReminder: {
        title: 'Planifica el mañana',
        description:
          'Tu jornada está a punto de terminar. Revisa tu progreso y decide los siguientes pasos.',
      },
      timerFinished: {
        title: 'Tiempo planificado finalizado',
        description: 'Un tiempo planificado ha finalizado.',
        untitledTask: 'Tarea sin título',
      },
    },
    settingsPage: {
      title: 'Ajustes',
      subtitle: 'Personaliza CheckPlanner',
      description:
        'Administra idioma, apariencia, jornada laboral y avisos desde un solo lugar.',
      badges: { current: 'Activo' },
      sections: {
        general: { title: 'Ajustes', description: 'Idioma y datos' },
        appearance: { title: 'Apariencia', description: 'Tema y presentación' },
        workSchedule: {
          title: 'Jornada laboral',
          description: 'Disponibilidad y recordatorios',
        },
        notifications: {
          title: 'Notificaciones',
          description: 'Avisos y preferencias',
        },
      },
      general: {
        language: {
          title: 'Idioma',
          description: 'Elige el idioma de la interfaz.',
        },
        data: {
          title: 'Datos y copias de seguridad',
          description: 'Importa, exporta o reinicia tu planificador.',
          importHelper: 'Restaura una copia de seguridad (.json).',
          exportHelper: 'Descarga una copia de tus datos actuales.',
          clearHelper:
            'Esto eliminará todas las tareas, etiquetas y preferencias.',
        },
      },
      appearance: {
        theme: {
          title: 'Tema',
          description: 'Ajusta el modo de la aplicación.',
          light: 'Modo claro',
          lightDescription: 'Interfaz luminosa y limpia para el día a día.',
          dark: 'Modo oscuro',
          darkDescription:
            'Interfaz atenuada para reducir el cansancio visual.',
          active: 'Activo',
        },
      },
      workSchedule: {
        title: 'Jornada laboral',
        description: 'Configura tus horarios y recordatorios.',
        helper:
          'Mantén tus horas de trabajo al día para mejorar los avisos y las repeticiones.',
        cta: 'Ir a jornada laboral',
      },
      notifications: {
        title: 'Notificaciones',
        description: 'Controla cómo recibes avisos.',
        helper:
          'Consulta las alertas pendientes o ajusta las preferencias en la página de notificaciones.',
        cta: 'Ir a notificaciones',
        soundPreferences: {
          title: 'Sonidos de notificaciones',
          description:
            'Activa o desactiva el sonido y elige un tono distinto para cada aviso.',
          toggleLabel: 'Activar sonido',
          selectLabel: 'Sonido',
          timerFinished: {
            title: 'Fin del tiempo planificado',
            description:
              'Aviso cuando termina el temporizador de planificación de una tarea.',
          },
          workdayReminder: {
            title: 'Aviso de fin de jornada',
            description:
              'Recordatorio para cerrar el día y preparar el siguiente antes de terminar.',
          },
        },
        soundOptions: {
          chime: 'Campana suave',
          bell: 'Campana clásica',
          digital: 'Tono digital',
          pulse: 'Pulso',
          spark: 'Destello',
        },
      },
    },
    workSchedulePage: {
      title: 'Jornada laboral',
      intro:
        'Guarda tu horario laboral para que CheckPlanner se adapte a tu jornada.',
      calendar: {
        instructions:
          'Haz clic y arrastra sobre los bloques de media hora para marcar cuándo empieza y termina tu jornada cada día.',
        timeLabel: 'Hora',
      },
      week: {
        monday: 'Lunes',
        tuesday: 'Martes',
        wednesday: 'Miércoles',
        thursday: 'Jueves',
        friday: 'Viernes',
        saturday: 'Sábado',
        sunday: 'Domingo',
      },
      actions: {
        title: 'Acciones disponibles',
        planningReminder: {
          title: 'Recordatorio para planificar el siguiente día',
          description:
            'Recibe un aviso poco antes de finalizar tu jornada para organizar el trabajo del día siguiente.',
          selectLabel: 'Avísame',
          selectSuffix: 'antes de que termine mi jornada',
          selectHelper:
            'Selecciona cuánto tiempo antes quieres recibir el aviso.',
          minutes: {
            '5': '5m',
            '15': '15m',
            '30': '30m',
            '60': '1h',
          },
          switchLabel: 'Activar recordatorio',
          fillScheduleFirst:
            'Rellena tu jornada laboral antes de activar este recordatorio.',
        },
      },
      reminder: {
        toast:
          'Tu jornada está a punto de terminar. Tómate un momento para planificar el próximo día.',
      },
    },
    footer: {
      about: 'Acerca de',
      openSource: 'Código abierto',
      faqs: 'Preguntas frecuentes y soporte',
      demoTemplates: 'Plantillas demo',
      privacy: 'Política de privacidad',
      terms: 'Términos del servicio',
    },
    demoTemplatesPage: {
      title: 'Plantillas demo',
      intro:
        'Importa estos ejemplos increíbles de cómo diferentes profesionales pueden usar CheckPlanner.',
      confirmExistingTitle: 'Respalda tus tareas antes de importar',
      confirmExistingDescription:
        'Ya tienes tareas o filtros guardados. Importar una plantilla demo reemplazará tus datos actuales. Exporta tus tareas para no perder tu progreso. En Ajustes encontrarás las opciones de Exportar, Importar y Eliminar todo.',
      confirmExistingExportCta: 'Exportar tareas',
      confirmExistingContinueCta: 'Importar demo igualmente',
      successTitle: 'Plantilla demo importada correctamente',
      successDescription:
        'Hemos rellenado tu espacio de trabajo con datos demo. Explora las tareas para ver cómo CheckPlanner ayuda a este rol.',
      successRoleLabel: 'Rol de la demo:',
      viewDemoCta: 'Ver demo',
      roles: {
        techLead: {
          title: 'Líder Técnico',
          description:
            'Como Líder Técnico necesitas organizar incidencias, revisar código, monitorizar sistemas y coordinar iniciativas para mantener al equipo alineado.',
          importCta: 'Importar plantilla demo',
        },
        architect: {
          title: 'Arquitecto',
          description:
            'Como Arquitecto coordinas el desarrollo conceptual, la relación con consultores, las visitas a obra y la documentación para licencias.',
          importCta: 'Importar plantilla demo',
        },
        graphicDesigner: {
          title: 'Diseñador Gráfico',
          description:
            'Como Diseñador Gráfico combinas conceptualización, producción, rondas de feedback y cuidado de la marca en cada entrega.',
          importCta: 'Importar plantilla demo',
        },
        marketingDirector: {
          title: 'Director de Marketing',
          description:
            'Como Director de Marketing diriges campañas, analizas resultados, alineas equipos y reportas el impacto al liderazgo.',
          importCta: 'Importar plantilla demo',
        },
        productManager: {
          title: 'Product Manager',
          description:
            'Como Product Manager conectas investigación, coordinación con stakeholders, ejecución del delivery y métricas para impulsar el producto.',
          importCta: 'Importar plantilla demo',
        },
      },
    },
    aboutPage: {
      title: 'Acerca de CheckPlanner',
      intro:
        'CheckPlanner es una aplicación gratuita creada para impulsar tu productividad personal en el trabajo.',
      features: {
        freeOpenSource: '100% gratuita y de código abierto.',
        privacy:
          'Toda la información se guarda localmente; no se envía nada a servidores ni terceros. Úsalo solo en tus dispositivos privados.',
        fast: 'Rápido y sin registros: todo se almacena en tu navegador y no se comparte ningún dato.',
        personal:
          'Enfocada en el uso personal, sin cuentas ni funciones para equipos.',
        export:
          'Exporta e importa tus datos para crear copias de seguridad o moverlos a otro dispositivo.',
        myTasks:
          'Añade tus tareas de forma organizada etiquetándolas como necesites y asignando una prioridad.',
        myDay:
          'Planifica tu trabajo diario seleccionando qué tareas quieres realizar cada día.',
      },
      sourceCode: 'El código fuente está disponible en',
      learnMore: 'Para conocer más, visita nuestras',
      and: 'y',
    },
    faqs: {
      title: 'Preguntas frecuentes',
      intro:
        'Encuentra respuestas a las preguntas más comunes sobre cómo aprovechar CheckPlanner.',
      q1: {
        question: '¿Qué es CheckPlanner?',
        answer:
          'CheckPlanner es una aplicación de productividad personal pensada para organizar tu trabajo diario desde el navegador, combinando tableros sencillos con acciones rápidas que te ayudan a mantener el foco.',
      },
      q2: {
        question: '¿Qué precio tiene CheckPlanner?',
        answer:
          'CheckPlanner es completamente gratuito, no tiene límites de uso y es open source, así que puedes revisar o ampliar el proyecto cuando quieras.',
      },
      q3: {
        question: '¿No hay registro de usuario o inicio de sesión?',
        answer:
          'No necesitas crear cuentas. CheckPlanner funciona de forma privada en tu dispositivo, carga al instante y evita distracciones al no requerir ningún proceso de registro.',
      },
      q4: {
        question: '¿Dónde se guardan mis datos?',
        answer:
          'Todas las tareas, preferencias y ajustes se almacenan localmente en tu navegador. Nada sale de tu dispositivo y puedes exportar tu espacio de trabajo en cualquier momento para crear copias de seguridad.',
      },
      q5: {
        question: '¿Se comparte mi información con terceros?',
        answer:
          'No. CheckPlanner no envía analíticas, telemetría ni datos de tareas a servicios externos: todo permanece en local en tu dispositivo.',
      },
      q6: {
        question: '¿Puedo continuar mi planificación en otro dispositivo?',
        answer:
          'Sí. Exporta tu planificación a un archivo JSON e impórtalo en otro dispositivo para continuar exactamente donde lo dejaste.',
      },
      q7: {
        question:
          '¿Existen accesos rápidos desde teclado para manejar mis tareas?',
        answer:
          'Sí. En Mi Día pulsa la barra espaciadora para seleccionar una tarea y usa las flechas del teclado para cambiar su estado al instante.',
      },
      q8: {
        question: '¿Puedo cambiar el tema o el idioma?',
        answer:
          'Sí. Utiliza los controles de la cabecera o abre los ajustes para alternar el tema y elegir el idioma que prefieras.',
      },
      supportTitle: 'Soporte',
      support:
        '¿Necesitas más ayuda? Usa las issues de GitHub para reportar incidencias o sugerencias.',
      supportLink: 'Abrir un issue',
    },

    privacyPage: {
      title: 'Política de privacidad',
      intro:
        'CheckPlanner es una aplicación que se ejecuta en tu dispositivo. Respetamos tu privacidad y no recopilamos datos personales.',
      localData: {
        title: 'Datos locales',
        description:
          'CheckPlanner funciona íntegramente en tu navegador. Las listas, columnas personalizadas y el estado de cada tarea se gestionan en tu dispositivo sin necesidad de crear cuentas ni conectarse a servicios externos. Guardamos esta información en el almacenamiento local del navegador (localStorage), junto con preferencias como el idioma, el tema y los recordatorios o tutoriales que hayas ocultado. Estos datos permanecen en tu equipo hasta que decides exportarlos o borrarlos manualmente, por ejemplo limpiando la caché del navegador o usando las acciones de reinicio de la aplicación.',
      },
      analytics: {
        title: 'Analítica',
        description:
          'La aplicación no utiliza analítica ni cookies de seguimiento.',
      },
      contact: {
        title: 'Contacto',
        description:
          'Si tienes preguntas, contáctanos mediante las issues de GitHub.',
      },
    },
    termsPage: {
      title: 'Términos del servicio',
      intro: 'Al usar CheckPlanner, aceptas los siguientes términos.',
      usage: {
        title: 'Uso de la aplicación',
        description:
          'La aplicación se proporciona “tal cual” sin garantías. Eres responsable de tus datos.',
      },
      privacy: {
        title: 'Privacidad',
        description:
          'Para obtener información sobre el tratamiento de datos, consulta nuestra',
      },
      liability: {
        title: 'Limitación de responsabilidad',
        description:
          'No somos responsables de ningún daño o pérdida de datos resultante del uso de la aplicación.',
      },
      changes: {
        title: 'Cambios en estos términos',
        description:
          'Podemos actualizar estos términos en cualquier momento. El uso continuado de la aplicación implica la aceptación de los nuevos términos.',
      },
      contact: {
        title: 'Contacto',
        description:
          'Si tienes preguntas, contáctanos mediante las issues de GitHub.',
      },
    },
    lang: {
      en: 'Inglés',
      es: 'Español',
      fr: 'Francés',
      it: 'Italiano',
      de: 'Alemán',
    },
  },
  fr: {
    nav: { myDay: 'Ma journée', myTasks: 'Mes tâches' },
    actions: {
      export: 'Exporter',
      import: 'Importer',
      clearAll: 'Tout supprimer',
      toggleTheme: 'Changer de thème',
      language: 'Choisir la langue',
      more: 'Plus d’actions',
      settings: 'Paramètres',
      workSchedule: 'Horaire de travail',
      removeTag: 'Supprimer l’étiquette',
      addTag: 'Ajouter une étiquette',
      favoriteTag: 'Ajouter l’étiquette aux favoris',
      unfavoriteTag: 'Retirer l’étiquette des favoris',
      close: 'Fermer',
      cancel: 'Annuler',
      notifications: 'Notifications',
    },
    confirmDelete: {
      message:
        'Êtes-vous sûr de vouloir supprimer le tableau ? Nous recommandons de l’exporter pour pouvoir restaurer votre travail plus tard en important le tableau.',
      cancel: 'Annuler',
      delete: 'Supprimer',
    },
    board: { todo: 'À faire', doing: 'En cours', done: 'Terminé' },
    lists: {
      ideas: 'Idées',
      backlog: 'Backlog',
      inprogress: 'En cours',
      done: 'Terminé',
    },
    addTask: {
      titleLabel: 'Titre',
      titlePlaceholder: 'Nouvelle tâche',
      tagsLabel: 'Étiquettes',
      tagsPlaceholder: 'Ajoutez des étiquettes (appuyez sur Entrée)',
      priorityLabel: 'Priorité',
      addButton: 'Ajouter',
      voiceInput: 'Ajouter par la voix',
      voiceInputNoText:
        'Aucun texte n’a été capturé. Réessayez et assurez-vous de parler dans la langue sélectionnée.',
    },
    taskCard: {
      markInProgress: 'Déplacer vers En cours',
      markDone: 'Marquer comme terminée',
      deleteTask: 'Supprimer la tâche',
      showTimer: 'Planifier le temps',
      setMainTask: 'Définir comme tâche principale',
      unsetMainTask: 'Retirer le statut de tâche principale',
      mainTaskTooltip: 'Tâche principale de la journée',
    },
    taskItem: {
      removeMyDay: 'Retirer de Ma journée',
      addMyDay: 'Ajouter à Ma journée',
      deleteTask: 'Supprimer la tâche',
      tagPlaceholder: 'Ajouter une étiquette',
      myDayHelp:
        'Planifiez votre travail quotidien en ajoutant des tâches à Ma journée.',
      recurring: {
        button: 'Répéter chaque semaine',
        buttonWithDays: 'Répétitions : {days}',
        description:
          'Sélectionnez les jours de la semaine où cette tâche doit se répéter.',
        limitedBySchedule:
          'Affichage limité aux jours configurés dans votre horaire de travail.',
        autoAddHint:
          'Ces jours-là, la tâche sera ajoutée à Ma journée automatiquement.',
        remove: 'Supprimer la répétition hebdomadaire',
        weekdaysShort: {
          monday: 'Lun',
          tuesday: 'Mar',
          wednesday: 'Mer',
          thursday: 'Jeu',
          friday: 'Ven',
          saturday: 'Sam',
          sunday: 'Dim',
        },
      },
    },
    myDayPage: {
      empty: 'Aucune tâche ajoutée à Ma journée',
      goToMyTasks: 'Aller à Mes tâches',
      progress: {
        full: 'Une grande journée en perspective—commençons !',
        medium: 'Vous avancez—continuez comme ça !',
        low: 'Presque terminé—tenez bon !',
        done: 'Toutes les tâches sont terminées ! Bravo !',
        clearCompleted: 'Supprimer les tâches terminées',
      },
    },
    timer: {
      start: 'Démarrer le minuteur',
      pause: 'Mettre le minuteur en pause',
      finished: 'Temps prévu pour « {task} » terminé',
    },
    priority: { low: 'Faible', medium: 'Moyenne', high: 'Élevée' },
    taskList: {
      noTasks: 'Aucune tâche',
      noTasksIntro: 'Vérifiez votre plan. Vérifiez votre journée.',
      exploreDemoTemplates: 'Explorer les modèles de démonstration',
    },
    dnd: {
      keyboardInstructions:
        'Appuyez sur espace pour prendre une tâche, utilisez les flèches pour la déplacer, appuyez de nouveau sur espace pour la déposer ou sur Échap pour annuler.',
    },
    tasksView: {
      mobileAddTask: {
        show: 'Ajouter une tâche',
      },
    },
    tagFilter: {
      showAll: 'Tout afficher',
      activeIndicator: '(actif)',
      confirmDelete:
        'Certaines tâches utilisent cette étiquette. Si vous la supprimez, ces tâches perdront l’étiquette. Continuer ?',
      tabsLabel: 'Filtrer les tâches par étiquette',
    },
    welcomeModal: {
      title: 'CheckPlanner',
      p1: 'Améliorez votre productivité, planifiez vos tâches et organisez votre travail quotidien.',
      p2: 'Vos données sont stockées localement, rien n’est envoyé à un serveur.',
      p3: 'Exportez vos données pour créer des sauvegardes locales de temps en temps.',
      p4: 'Conçu pour un usage personnel, pas pour les équipes.',
      p5: '100 % gratuit et illimité, open source.',
      cta: 'C’est parti !',
    },
    notifications: {
      title: 'Notifications',
      empty: 'Aucune notification',
      dismiss: 'Fermer la notification',
      welcome: {
        title: 'Bienvenue sur CheckPlanner',
        description:
          'Utilisez le tableau « Mes tâches » pour collecter et prioriser tout ce que vous devez faire. Déplacez les éléments dans « Ma journée » lorsque vous êtes prêt à vous concentrer dessus. Ouvrez les paramètres pour changer le thème, exporter vos données et plus encore.',
        installCta: 'Installer l’application',
        installUnavailable:
          'L’installation est disponible uniquement dans les navigateurs compatibles. Essayez d’utiliser le menu du navigateur pour ajouter CheckPlanner à votre appareil.',
        installInstalled: 'Application déjà installée',
        demoCta: 'Explorer les modèles de démonstration',
      },
      workScheduleSuggestion: {
        title: 'Ajoutez votre horaire de travail',
        description:
          'Enregistrez vos heures de travail pour activer un rappel de planification avant la fin de chaque journée, préparer le lendemain à l’avance et démarrer la journée de façon productive.',
        cta: 'Configurer l’horaire de travail',
      },
      workReminder: {
        title: 'Planifier demain',
        description:
          'Votre journée de travail est sur le point de se terminer. Vérifiez vos progrès et décidez des prochaines étapes.',
      },
      timerFinished: {
        title: 'Temps planifié terminé',
        description: 'Un temps planifié est terminé.',
        untitledTask: 'Tâche sans titre',
      },
    },
    settingsPage: {
      title: 'Paramètres',
      subtitle: 'Personnalisez CheckPlanner',
      description:
        'Gérez la langue, le thème, les horaires et les alertes au même endroit.',
      badges: { current: 'Actif' },
      sections: {
        general: { title: 'Paramètres', description: 'Langue et données' },
        appearance: {
          title: 'Apparence',
          description: 'Thème et présentation',
        },
        workSchedule: {
          title: 'Horaire de travail',
          description: 'Disponibilité et rappels',
        },
        notifications: {
          title: 'Notifications',
          description: 'Alertes et préférences',
        },
      },
      general: {
        language: {
          title: 'Langue',
          description: "Choisissez la langue de l'interface.",
        },
        data: {
          title: 'Données et sauvegardes',
          description:
            'Importez, exportez ou réinitialisez votre planificateur.',
          importHelper: 'Restaurez une sauvegarde (.json).',
          exportHelper: 'Téléchargez une copie de vos données actuelles.',
          clearHelper:
            'Cela supprimera toutes les tâches, étiquettes et préférences.',
        },
      },
      appearance: {
        theme: {
          title: 'Thème',
          description: 'Choisissez le mode adapté à votre espace de travail.',
          light: 'Mode clair',
          lightDescription: 'Interface lumineuse et épurée pour la journée.',
          dark: 'Mode sombre',
          darkDescription:
            'Interface assombrie pour réduire la fatigue visuelle.',
          active: 'Actif',
        },
      },
      workSchedule: {
        title: 'Horaire de travail',
        description: 'Définissez vos horaires et vos rappels.',
        helper:
          'Maintenez vos heures de travail à jour pour améliorer les rappels et les répétitions.',
        cta: 'Gérer l’horaire de travail',
      },
      notifications: {
        title: 'Notifications',
        description: 'Contrôlez la façon dont vous êtes informé.',
        helper:
          'Consultez les alertes en attente ou ajustez les préférences depuis la page des notifications.',
        cta: 'Ouvrir les notifications',
        soundPreferences: {
          title: 'Sons des notifications',
          description:
            'Activez ou désactivez le son et choisissez une tonalité différente pour chaque alerte.',
          toggleLabel: 'Activer le son',
          selectLabel: 'Son',
          timerFinished: {
            title: 'Fin du temps planifié',
            description:
              'Alerte lorsque le minuteur de planification d’une tâche se termine.',
          },
          workdayReminder: {
            title: 'Rappel de fin de journée',
            description:
              'Rappel pour conclure la journée et préparer la suivante avant de terminer.',
          },
        },
        soundOptions: {
          chime: 'Carillon doux',
          bell: 'Cloche classique',
          digital: 'Ping digital',
          pulse: 'Pouls',
          spark: 'Éclat',
        },
      },
    },
    workSchedulePage: {
      title: 'Horaire de travail',
      intro:
        'Enregistrez vos heures de travail pour que CheckPlanner s’adapte à votre journée.',
      calendar: {
        instructions:
          'Cliquez et faites glisser sur les créneaux de trente minutes pour indiquer quand votre journée commence et se termine chaque jour.',
        timeLabel: 'Heure',
      },
      week: {
        monday: 'Lundi',
        tuesday: 'Mardi',
        wednesday: 'Mercredi',
        thursday: 'Jeudi',
        friday: 'Vendredi',
        saturday: 'Samedi',
        sunday: 'Dimanche',
      },
      actions: {
        title: 'Actions disponibles',
        planningReminder: {
          title: 'Rappel pour planifier demain',
          description:
            'Recevez un rappel peu avant la fin de votre journée afin d’organiser le lendemain.',
          selectLabel: 'Prévenez-moi',
          selectSuffix: 'avant la fin de ma journée',
          selectHelper:
            'Choisissez combien de temps avant vous souhaitez recevoir le rappel.',
          minutes: {
            '5': '5 min',
            '15': '15 min',
            '30': '30 min',
            '60': '1 h',
          },
          switchLabel: 'Activer le rappel',
          fillScheduleFirst:
            'Définissez votre horaire de travail avant d’activer ce rappel.',
        },
      },
      reminder: {
        toast:
          'Votre journée de travail est sur le point de se terminer. Prenez un moment pour planifier demain.',
      },
    },
    footer: {
      about: 'À propos',
      openSource: 'Open source',
      faqs: 'FAQ et assistance',
      demoTemplates: 'Modèles de démonstration',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions d’utilisation',
    },
    demoTemplatesPage: {
      title: 'Modèles de démonstration',
      intro:
        'Importez ces exemples inspirants montrant comment différents professionnels peuvent utiliser CheckPlanner.',
      confirmExistingTitle: 'Sauvegardez vos tâches avant d’importer',
      confirmExistingDescription:
        'Vous avez déjà des tâches ou des filtres enregistrés. Importer un modèle de démonstration remplacera vos données actuelles. Exportez d’abord vos tâches pour éviter de perdre votre progression. Dans Paramètres vous trouverez les options pour Exporter, Importer ou Tout supprimer.',
      confirmExistingExportCta: 'Exporter les tâches',
      confirmExistingContinueCta: 'Importer la démo quand même',
      successTitle: 'Modèle de démonstration importé avec succès',
      successDescription:
        'Votre espace de travail a été rempli avec des données de démonstration. Explorez les tâches pour découvrir comment CheckPlanner accompagne ce rôle.',
      successRoleLabel: 'Rôle de la démo :',
      viewDemoCta: 'Voir la démo',
      roles: {
        techLead: {
          title: 'Responsable technique',
          description:
            'En tant que responsable technique vous coordonnez les incidents, les revues de code, la supervision des systèmes et les initiatives à long terme tout en gardant l’équipe alignée.',
          importCta: 'Importer le modèle de démonstration',
        },
        architect: {
          title: 'Architecte',
          description:
            'Les architectes équilibrent développement conceptuel, coordination avec les consultants, visites de chantier et documentation pour les permis tout en orientant les décisions de conception.',
          importCta: 'Importer le modèle de démonstration',
        },
        graphicDesigner: {
          title: 'Designer graphique',
          description:
            'Les designers graphiques jonglent entre conceptualisation, production, cycles de retours et gestion de la marque sur les supports numériques et imprimés.',
          importCta: 'Importer le modèle de démonstration',
        },
        marketingDirector: {
          title: 'Directeur marketing',
          description:
            'Les directeurs marketing orchestrent les campagnes, analysent la performance, alignent les équipes et rendent compte des résultats à la direction.',
          importCta: 'Importer le modèle de démonstration',
        },
        productManager: {
          title: 'Product manager',
          description:
            'Les product managers relient insights de découverte, alignement des parties prenantes, exécution de la livraison et métriques pour générer de l’impact produit.',
          importCta: 'Importer le modèle de démonstration',
        },
      },
    },
    aboutPage: {
      title: 'À propos de CheckPlanner',
      intro:
        'CheckPlanner est une application gratuite conçue pour booster votre productivité personnelle au travail.',
      features: {
        freeOpenSource: '100 % gratuit et open source.',
        privacy:
          'Toutes les informations restent locales ; rien n’est envoyé à des serveurs ni à des tiers. Utilisez-le uniquement sur vos appareils personnels.',
        fast: 'Rapide et sans inscription : tout est stocké dans votre navigateur et aucune donnée n’est partagée.',
        personal:
          'Centré sur un usage personnel — pas de comptes ni de fonctions pour les équipes.',
        export:
          'Exportez et importez vos données pour créer des sauvegardes ou les transférer sur un autre appareil.',
        myTasks:
          'Ajoutez vos tâches de manière organisée, étiquetez-les selon vos besoins et définissez leur priorité.',
        myDay:
          'Planifiez votre travail quotidien en choisissant les tâches que vous souhaitez réaliser chaque jour.',
      },
      sourceCode: 'Le code source est disponible sur',
      learnMore: 'En savoir plus dans nos',
      and: 'et',
    },
    faqs: {
      title: 'Foire aux questions',
      intro:
        'Trouvez des réponses aux questions les plus fréquentes pour tirer le meilleur parti de CheckPlanner.',
      q1: {
        question: 'Qu’est-ce que CheckPlanner ?',
        answer:
          'CheckPlanner est une application de productivité personnelle conçue pour organiser votre travail quotidien directement dans le navigateur, en combinant des tableaux de planification simples et des actions rapides pour vous aider à rester concentré.',
      },
      q2: {
        question: 'Combien coûte CheckPlanner ?',
        answer:
          'CheckPlanner est totalement gratuit, offre une planification illimitée et est publié en open source pour que vous puissiez l’examiner ou l’étendre quand vous le souhaitez.',
      },
      q3: {
        question: 'Faut-il créer un compte ou se connecter ?',
        answer:
          'Aucun compte n’est nécessaire. CheckPlanner fonctionne en privé sur votre appareil, se charge instantanément et reste rapide et sans distractions, sans aucun processus d’inscription.',
      },
      q4: {
        question: 'Où mes données sont-elles stockées ?',
        answer:
          'Chaque tâche, préférence de tableau et réglage est stocké localement dans votre navigateur. Rien ne quitte votre appareil, et vous pouvez exporter votre espace de travail à tout moment pour créer des sauvegardes.',
      },
      q5: {
        question: 'Mes informations sont-elles partagées avec des tiers ?',
        answer:
          'Non. CheckPlanner n’envoie ni analytique, ni télémétrie, ni données de tâches vers des services externes : tout reste local sur votre appareil.',
      },
      q6: {
        question: 'Puis-je continuer ma planification sur un autre appareil ?',
        answer:
          'Oui. Exportez votre plan actuel dans un fichier JSON et importez-le sur un autre appareil pour reprendre exactement où vous vous êtes arrêté.',
      },
      q7: {
        question: 'Existe-t-il des raccourcis clavier pour gérer mes tâches ?',
        answer:
          'Oui. Dans Ma journée, appuyez sur la barre d’espace pour sélectionner une tâche et utilisez les flèches du clavier pour la déplacer instantanément dans le flux de travail.',
      },
      q8: {
        question: 'Puis-je changer le thème ou la langue ?',
        answer:
          'Oui. Utilisez les contrôles de l’en-tête ou ouvrez les Paramètres pour basculer entre les modes clair et sombre et choisir la langue de votre choix.',
      },
      supportTitle: 'Support',
      support:
        'Besoin d’aide supplémentaire ? Utilisez nos issues GitHub pour signaler des problèmes ou des suggestions.',
      supportLink: 'Ouvrir une issue',
    },
    privacyPage: {
      title: 'Politique de confidentialité',
      intro:
        'CheckPlanner est une application côté client. Nous respectons votre vie privée et ne collectons pas de données personnelles.',
      localData: {
        title: 'Données locales',
        description:
          'Toutes les listes, colonnes personnalisées et états des tâches sont traités directement dans votre navigateur sans compte requis. Nous conservons ces informations dans le stockage local du navigateur ainsi que vos préférences (langue, thème, astuces ignorées). Les données restent sur votre appareil, sauf si vous les exportez ou les supprimez manuellement, par exemple en effaçant le cache du navigateur ou en utilisant les actions de réinitialisation de l’application.',
      },
      analytics: {
        title: 'Analyse',
        description:
          'L’application n’utilise ni analytique ni cookies de suivi.',
      },
      contact: {
        title: 'Contact',
        description:
          'Si vous avez des questions, contactez-nous via les issues GitHub.',
      },
    },
    termsPage: {
      title: 'Conditions d’utilisation',
      intro:
        'En utilisant CheckPlanner, vous acceptez les conditions suivantes.',
      usage: {
        title: 'Utilisation de l’application',
        description:
          'L’application est fournie « telle quelle » sans garantie. Vous êtes responsable de vos données.',
      },
      privacy: {
        title: 'Confidentialité',
        description:
          'Pour plus d’informations sur la gestion des données, veuillez consulter notre',
      },
      liability: {
        title: 'Limitation de responsabilité',
        description:
          'Nous ne sommes pas responsables des dommages ou pertes de données résultant de l’utilisation de l’application.',
      },
      changes: {
        title: 'Modifications de ces conditions',
        description:
          'Nous pouvons mettre à jour ces conditions à tout moment. Continuer d’utiliser l’application vaut acceptation des nouvelles conditions.',
      },
      contact: {
        title: 'Contact',
        description:
          'Si vous avez des questions, contactez-nous via les issues GitHub.',
      },
    },
    lang: {
      en: 'Anglais',
      es: 'Espagnol',
      fr: 'Français',
      it: 'Italien',
      de: 'Allemand',
    },
  },
  it: {
    nav: { myDay: 'Il mio giorno', myTasks: 'Le mie attività' },
    actions: {
      export: 'Esporta',
      import: 'Importa',
      clearAll: 'Cancella tutto',
      toggleTheme: 'Cambia tema',
      language: 'Seleziona lingua',
      more: 'Altre azioni',
      settings: 'Impostazioni',
      workSchedule: 'Orario di lavoro',
      removeTag: 'Rimuovi etichetta',
      addTag: 'Aggiungi etichetta',
      favoriteTag: 'Aggiungi etichetta ai preferiti',
      unfavoriteTag: 'Rimuovi etichetta dai preferiti',
      close: 'Chiudi',
      cancel: 'Annulla',
      notifications: 'Notifiche',
    },
    confirmDelete: {
      message:
        'Sei sicuro di voler eliminare la dashboard? Ti consigliamo di esportarla così potrai ripristinare il tuo lavoro più tardi importando la dashboard.',
      cancel: 'Annulla',
      delete: 'Elimina',
    },
    board: { todo: 'Da fare', doing: 'In corso', done: 'Completato' },
    lists: {
      ideas: 'Idee',
      backlog: 'Backlog',
      inprogress: 'In corso',
      done: 'Completato',
    },
    addTask: {
      titleLabel: 'Titolo',
      titlePlaceholder: 'Nuova attività',
      tagsLabel: 'Etichette',
      tagsPlaceholder: 'Aggiungi etichette (premi Invio)',
      priorityLabel: 'Priorità',
      addButton: 'Aggiungi',
      voiceInput: 'Aggiungi con la voce',
      voiceInputNoText:
        'Non è stato rilevato testo. Riprova e assicurati di parlare nella lingua selezionata.',
    },
    taskCard: {
      markInProgress: 'Sposta in In corso',
      markDone: 'Segna come completata',
      deleteTask: 'Elimina attività',
      showTimer: 'Pianifica tempo',
      setMainTask: 'Imposta come attività principale',
      unsetMainTask: 'Rimuovi attività principale',
      mainTaskTooltip: 'Attività principale della giornata',
    },
    taskItem: {
      removeMyDay: 'Rimuovi da Il mio giorno',
      addMyDay: 'Aggiungi a Il mio giorno',
      deleteTask: 'Elimina attività',
      tagPlaceholder: 'Aggiungi etichetta',
      myDayHelp:
        'Organizza il tuo lavoro quotidiano aggiungendo attività a Il mio giorno.',
      recurring: {
        button: 'Ripeti ogni settimana',
        buttonWithDays: 'Ripetizioni: {days}',
        description:
          'Seleziona i giorni della settimana in cui questa attività deve ripetersi.',
        limitedBySchedule:
          'Mostriamo solo i giorni configurati nel tuo orario di lavoro.',
        autoAddHint:
          'In quei giorni l’attività verrà aggiunta a Il mio giorno automaticamente.',
        remove: 'Rimuovi ripetizione settimanale',
        weekdaysShort: {
          monday: 'Lun',
          tuesday: 'Mar',
          wednesday: 'Mer',
          thursday: 'Gio',
          friday: 'Ven',
          saturday: 'Sab',
          sunday: 'Dom',
        },
      },
    },
    myDayPage: {
      empty: 'Nessuna attività aggiunta a Il mio giorno',
      goToMyTasks: 'Vai a Le mie attività',
      progress: {
        full: 'Giornata intensa davanti a te—cominciamo!',
        medium: 'Stai facendo progressi—continua così!',
        low: 'Ci sei quasi—non mollare!',
        done: 'Tutte le attività completate! Ottimo lavoro!',
        clearCompleted: 'Rimuovi attività completate',
      },
    },
    timer: {
      start: 'Avvia timer',
      pause: 'Metti in pausa il timer',
      finished: 'Tempo pianificato per "{task}" terminato',
    },
    priority: { low: 'Bassa', medium: 'Media', high: 'Alta' },
    taskList: {
      noTasks: 'Nessuna attività',
      noTasksIntro: 'Controlla il tuo piano. Controlla la tua giornata.',
      exploreDemoTemplates: 'Esplora i modelli demo',
    },
    dnd: {
      keyboardInstructions:
        'Premi la barra spaziatrice per prendere un’attività, usa le frecce per spostarla, premi di nuovo la barra spaziatrice per rilasciarla oppure premi Esc per annullare.',
    },
    tasksView: {
      mobileAddTask: {
        show: 'Aggiungi attività',
      },
    },
    tagFilter: {
      showAll: 'Mostra tutto',
      activeIndicator: '(attivo)',
      confirmDelete:
        'Alcune attività utilizzano questa etichetta. Se la rimuovi, quelle attività perderanno l’etichetta. Continuare?',
      tabsLabel: 'Filtra le attività per etichetta',
    },
    welcomeModal: {
      title: 'CheckPlanner',
      p1: 'Migliora la tua produttività, pianifica le attività e organizza il tuo lavoro quotidiano.',
      p2: 'I tuoi dati sono archiviati in locale, nulla viene inviato a server.',
      p3: 'Esporta i tuoi dati per creare periodicamente copie di backup locali.',
      p4: 'Progettato per uso personale, non per i team.',
      p5: '100% gratuito e illimitato, open source.',
      cta: 'Iniziamo!',
    },
    notifications: {
      title: 'Notifiche',
      empty: 'Nessuna notifica',
      dismiss: 'Ignora notifica',
      welcome: {
        title: 'Benvenuto in CheckPlanner',
        description:
          'Usa la board « Le mie attività » per raccogliere e dare priorità a tutto ciò che devi fare. Sposta gli elementi in « Il mio giorno » quando sei pronto a concentrarti su di essi. Apri le impostazioni per cambiare tema, esportare i tuoi dati e molto altro.',
        installCta: 'Installa app',
        installUnavailable:
          'L’installazione è disponibile solo nei browser supportati. Prova a usare il menu del browser per aggiungere CheckPlanner al tuo dispositivo.',
        installInstalled: 'App già installata',
        demoCta: 'Esplora i modelli demo',
      },
      workScheduleSuggestion: {
        title: 'Aggiungi il tuo orario di lavoro',
        description:
          'Salva le tue ore di lavoro per attivare un promemoria di pianificazione prima della fine di ogni giornata, preparare in anticipo il giorno successivo e iniziare la giornata in modo produttivo.',
        cta: 'Imposta orario di lavoro',
      },
      workReminder: {
        title: 'Pianifica domani',
        description:
          'La tua giornata lavorativa sta per finire. Rivedi i progressi e decidi i prossimi passi.',
      },
      timerFinished: {
        title: 'Tempo pianificato terminato',
        description: 'Un tempo pianificato è terminato.',
        untitledTask: 'Attività senza titolo',
      },
    },
    settingsPage: {
      title: 'Impostazioni',
      subtitle: 'Personalizza CheckPlanner',
      description:
        'Gestisci lingua, aspetto, orari di lavoro e avvisi da un unico spazio.',
      badges: { current: 'Attivo' },
      sections: {
        general: { title: 'Impostazioni', description: 'Lingua e dati' },
        appearance: { title: 'Aspetto', description: 'Tema e presentazione' },
        workSchedule: {
          title: 'Orario di lavoro',
          description: 'Disponibilità e promemoria',
        },
        notifications: {
          title: 'Notifiche',
          description: 'Avvisi e preferenze',
        },
      },
      general: {
        language: {
          title: 'Lingua',
          description: "Scegli la lingua dell'interfaccia.",
        },
        data: {
          title: 'Dati e backup',
          description: 'Importa, esporta o reimposta il planner.',
          importHelper: 'Ripristina un backup precedente (.json).',
          exportHelper: 'Scarica una copia dei tuoi dati attuali.',
          clearHelper:
            'Questo eliminerà tutte le attività, le etichette e le preferenze.',
        },
      },
      appearance: {
        theme: {
          title: 'Tema',
          description: 'Scegli la modalità adatta al tuo ambiente di lavoro.',
          light: 'Modalità chiara',
          lightDescription:
            'Interfaccia luminosa e pulita per il lavoro diurno.',
          dark: 'Modalità scura',
          darkDescription:
            'Interfaccia attenuata per ridurre l’affaticamento visivo.',
          active: 'Attivo',
        },
      },
      workSchedule: {
        title: 'Orario di lavoro',
        description: 'Imposta gli orari e i promemoria.',
        helper:
          'Mantieni aggiornate le tue ore di lavoro per migliorare promemoria e ricorrenze.',
        cta: 'Gestisci orario di lavoro',
      },
      notifications: {
        title: 'Notifiche',
        description: 'Controlla come ricevi gli avvisi.',
        helper:
          'Rivedi gli avvisi non letti o regola le preferenze dalla pagina notifiche.',
        cta: 'Apri notifiche',
        soundPreferences: {
          title: 'Suoni delle notifiche',
          description:
            'Attiva o disattiva i suoni e scegli un tono diverso per ogni avviso.',
          toggleLabel: 'Attiva suono',
          selectLabel: 'Suono',
          timerFinished: {
            title: 'Fine del tempo pianificato',
            description:
              'Avviso quando termina il timer di pianificazione di un’attività.',
          },
          workdayReminder: {
            title: 'Promemoria di fine giornata',
            description:
              'Promemoria per chiudere la giornata e preparare la successiva prima di finire.',
          },
        },
        soundOptions: {
          chime: 'Scampanellio',
          bell: 'Campanella classica',
          digital: 'Ping digitale',
          pulse: 'Battito',
          spark: 'Scintilla',
        },
      },
    },
    workSchedulePage: {
      title: 'Orario di lavoro',
      intro:
        'Salva le tue ore di lavoro così CheckPlanner può adattarsi alla tua giornata.',
      calendar: {
        instructions:
          'Fai clic e trascina sugli slot da mezz’ora per indicare quando inizia e finisce la tua giornata ogni giorno.',
        timeLabel: 'Ora',
      },
      week: {
        monday: 'Lunedì',
        tuesday: 'Martedì',
        wednesday: 'Mercoledì',
        thursday: 'Giovedì',
        friday: 'Venerdì',
        saturday: 'Sabato',
        sunday: 'Domenica',
      },
      actions: {
        title: 'Azioni disponibili',
        planningReminder: {
          title: 'Promemoria per pianificare domani',
          description:
            'Ricevi un promemoria poco prima della fine della tua giornata per organizzare il giorno successivo.',
          selectLabel: 'Avvisami',
          selectSuffix: 'prima della fine della mia giornata',
          selectHelper:
            'Scegli quanto tempo prima vuoi ricevere il promemoria.',
          minutes: {
            '5': '5 min',
            '15': '15 min',
            '30': '30 min',
            '60': '1 h',
          },
          switchLabel: 'Attiva promemoria',
          fillScheduleFirst:
            'Compila il tuo orario di lavoro prima di attivare questo promemoria.',
        },
      },
      reminder: {
        toast:
          'La tua giornata lavorativa sta per finire. Prenditi un momento per pianificare domani.',
      },
    },
    footer: {
      about: 'Informazioni',
      openSource: 'Open source',
      faqs: 'FAQ e supporto',
      demoTemplates: 'Modelli demo',
      privacy: 'Informativa sulla privacy',
      terms: 'Termini di servizio',
    },
    demoTemplatesPage: {
      title: 'Modelli demo',
      intro:
        'Importa questi esempi che mostrano come diversi professionisti possono utilizzare CheckPlanner.',
      confirmExistingTitle: 'Fai un backup delle attività prima di importare',
      confirmExistingDescription:
        'Hai già attività o filtri salvati. Importare un modello demo sostituirà i tuoi dati attuali. Esporta prima le attività per evitare di perdere i progressi. In Impostazioni trovi le opzioni per Esportare, Importare o Eliminare tutto.',
      confirmExistingExportCta: 'Esporta attività',
      confirmExistingContinueCta: 'Importa comunque la demo',
      successTitle: 'Modello demo importato con successo',
      successDescription:
        'Il tuo spazio di lavoro è stato popolato con dati demo. Esplora le attività per vedere come CheckPlanner supporta questo ruolo.',
      successRoleLabel: 'Ruolo demo:',
      viewDemoCta: 'Guarda la demo',
      roles: {
        techLead: {
          title: 'Responsabile tecnico',
          description:
            'Come responsabile tecnico coordini gli incidenti, le revisioni del codice, il monitoraggio dei sistemi e le iniziative a lungo termine mantenendo il team allineato.',
          importCta: 'Importa modello demo',
        },
        architect: {
          title: 'Architetto',
          description:
            'Gli architetti bilanciano lo sviluppo del concept, il coordinamento con i consulenti, le visite in cantiere e la documentazione per le autorizzazioni guidando le decisioni progettuali.',
          importCta: 'Importa modello demo',
        },
        graphicDesigner: {
          title: 'Graphic designer',
          description:
            'I graphic designer gestiscono concept, produzione, cicli di feedback e tutela del brand su touchpoint digitali e stampa.',
          importCta: 'Importa modello demo',
        },
        marketingDirector: {
          title: 'Direttore marketing',
          description:
            'I direttori marketing orchestrano le campagne, analizzano le performance, allineano i team e riportano i risultati alla direzione.',
          importCta: 'Importa modello demo',
        },
        productManager: {
          title: 'Product manager',
          description:
            'I product manager collegano insight della discovery, allineamento degli stakeholder, esecuzione del delivery e metriche per generare impatto sul prodotto.',
          importCta: 'Importa modello demo',
        },
      },
    },
    aboutPage: {
      title: 'Informazioni su CheckPlanner',
      intro:
        'CheckPlanner è un’app gratuita pensata per migliorare la tua produttività personale al lavoro.',
      features: {
        freeOpenSource: '100% gratuita e open source.',
        privacy:
          'Tutte le informazioni restano in locale; niente viene inviato a server o terze parti. Usala solo sui tuoi dispositivi personali.',
        fast: 'Veloce e senza registrazione: tutto è archiviato nel tuo browser e nessun dato viene condiviso.',
        personal:
          'Incentrata sull’uso personale: nessun account o funzionalità per team.',
        export:
          'Esporta e importa i tuoi dati per creare backup o trasferirli su un altro dispositivo.',
        myTasks:
          'Aggiungi le tue attività in modo organizzato, applica etichette e assegna priorità.',
        myDay:
          'Pianifica il lavoro quotidiano scegliendo le attività che vuoi svolgere ogni giorno.',
      },
      sourceCode: 'Il codice sorgente è disponibile su',
      learnMore: 'Scopri di più nella nostra',
      and: 'e',
    },
    faqs: {
      title: 'Domande frequenti',
      intro:
        'Trova risposte alle domande più comuni su come sfruttare al massimo CheckPlanner.',
      q1: {
        question: 'Che cos’è CheckPlanner?',
        answer:
          'CheckPlanner è un’app di produttività personale pensata per organizzare il tuo lavoro quotidiano direttamente nel browser, combinando bacheche semplici e azioni rapide che ti aiutano a restare concentrato.',
      },
      q2: {
        question: 'Quanto costa CheckPlanner?',
        answer:
          'CheckPlanner è completamente gratuito, offre pianificazione illimitata ed è open source così puoi esaminarlo o estenderlo quando vuoi.',
      },
      q3: {
        question: 'Serve registrarsi o accedere?',
        answer:
          'Non è richiesto alcun account. CheckPlanner funziona privatamente sul tuo dispositivo, si carica all’istante e rimane veloce e senza distrazioni senza alcun processo di registrazione.',
      },
      q4: {
        question: 'Dove vengono archiviati i miei dati?',
        answer:
          'Ogni attività, preferenza della board e impostazione è archiviata localmente nel browser. Nulla lascia il tuo dispositivo e puoi esportare il workspace in qualsiasi momento per creare backup.',
      },
      q5: {
        question: 'Le mie informazioni vengono condivise con terze parti?',
        answer:
          'No. CheckPlanner non invia analisi, telemetria o dati delle attività a servizi esterni: tutto resta in locale sul tuo dispositivo.',
      },
      q6: {
        question: 'Posso continuare a pianificare su un altro dispositivo?',
        answer:
          'Sì. Esporta il tuo piano attuale in un file JSON e importalo su un altro dispositivo per riprendere esattamente da dove eri rimasto.',
      },
      q7: {
        question: 'Esistono scorciatoie da tastiera per gestire le attività?',
        answer:
          'Sì. In Il mio giorno premi la barra spaziatrice per selezionare un’attività e usa le frecce per spostarla rapidamente nel flusso di lavoro.',
      },
      q8: {
        question: 'Posso cambiare tema o lingua?',
        answer:
          'Sì. Usa i controlli nell’intestazione oppure apri Impostazioni per passare tra modalità chiara e scura e scegliere la lingua che preferisci.',
      },
      supportTitle: 'Supporto',
      support:
        'Hai bisogno di ulteriore aiuto? Usa le issue su GitHub per segnalare problemi o suggerimenti.',
      supportLink: 'Apri un’issue',
    },
    privacyPage: {
      title: 'Informativa sulla privacy',
      intro:
        'CheckPlanner è un’app lato client. Rispettiamo la tua privacy e non raccogliamo dati personali.',
      localData: {
        title: 'Dati locali',
        description:
          'Tutte le liste, le colonne personalizzate e lo stato delle attività vengono elaborati direttamente nel tuo browser senza bisogno di account. Conserviamo queste informazioni nel localStorage insieme alle preferenze come lingua, tema e suggerimenti che hai disattivato. I dati restano sul dispositivo a meno che tu non li esporti o li elimini manualmente, ad esempio svuotando la cache del browser o usando le azioni di reset dell’app.',
      },
      analytics: {
        title: 'Analisi',
        description:
          'L’applicazione non utilizza analisi né cookie di tracciamento.',
      },
      contact: {
        title: 'Contatti',
        description: 'Se hai domande, contattaci tramite le issue su GitHub.',
      },
    },
    termsPage: {
      title: 'Termini di servizio',
      intro: 'Utilizzando CheckPlanner accetti i seguenti termini.',
      usage: {
        title: 'Uso dell’applicazione',
        description:
          'L’app viene fornita “così com’è” senza garanzie. Sei responsabile dei tuoi dati.',
      },
      privacy: {
        title: 'Privacy',
        description:
          'Per informazioni sul trattamento dei dati consulta la nostra',
      },
      liability: {
        title: 'Limitazione di responsabilità',
        description:
          'Non siamo responsabili di eventuali danni o perdite di dati derivanti dall’uso dell’app.',
      },
      changes: {
        title: 'Modifiche a questi termini',
        description:
          'Possiamo aggiornare questi termini in qualsiasi momento. Continuare a usare l’app implica l’accettazione dei nuovi termini.',
      },
      contact: {
        title: 'Contatti',
        description: 'Se hai domande, contattaci tramite le issue su GitHub.',
      },
    },
    lang: {
      en: 'Inglese',
      es: 'Spagnolo',
      fr: 'Francese',
      it: 'Italiano',
      de: 'Tedesco',
    },
  },
  de: {
    nav: { myDay: 'Mein Tag', myTasks: 'Meine Aufgaben' },
    actions: {
      export: 'Exportieren',
      import: 'Importieren',
      clearAll: 'Alles löschen',
      toggleTheme: 'Theme wechseln',
      language: 'Sprache auswählen',
      more: 'Weitere Aktionen',
      settings: 'Einstellungen',
      workSchedule: 'Arbeitszeit',
      removeTag: 'Etikett entfernen',
      addTag: 'Etikett hinzufügen',
      favoriteTag: 'Etikett zu Favoriten hinzufügen',
      unfavoriteTag: 'Etikett aus Favoriten entfernen',
      close: 'Schließen',
      cancel: 'Abbrechen',
      notifications: 'Benachrichtigungen',
    },
    confirmDelete: {
      message:
        'Möchtest du das Dashboard wirklich löschen? Wir empfehlen, es zu exportieren, damit du deine Arbeit später wiederherstellen kannst, indem du das Dashboard importierst.',
      cancel: 'Abbrechen',
      delete: 'Löschen',
    },
    board: { todo: 'To-do', doing: 'In Arbeit', done: 'Erledigt' },
    lists: {
      ideas: 'Ideen',
      backlog: 'Backlog',
      inprogress: 'In Arbeit',
      done: 'Erledigt',
    },
    addTask: {
      titleLabel: 'Titel',
      titlePlaceholder: 'Neue Aufgabe',
      tagsLabel: 'Tags',
      tagsPlaceholder: 'Tags hinzufügen (Enter drücken)',
      priorityLabel: 'Priorität',
      addButton: 'Hinzufügen',
      voiceInput: 'Per Spracheingabe hinzufügen',
      voiceInputNoText:
        'Es wurde kein Text erfasst. Bitte versuche es erneut und sprich in der ausgewählten Sprache.',
    },
    taskCard: {
      markInProgress: 'In „In Arbeit“ verschieben',
      markDone: 'Als erledigt markieren',
      deleteTask: 'Aufgabe löschen',
      showTimer: 'Zeit planen',
      setMainTask: 'Als Hauptaufgabe festlegen',
      unsetMainTask: 'Hauptaufgabe entfernen',
      mainTaskTooltip: 'Hauptaufgabe des Tages',
    },
    taskItem: {
      removeMyDay: 'Aus „Mein Tag“ entfernen',
      addMyDay: 'Zu „Mein Tag“ hinzufügen',
      deleteTask: 'Aufgabe löschen',
      tagPlaceholder: 'Etikett hinzufügen',
      myDayHelp:
        'Plane deinen Arbeitstag, indem du Aufgaben zu „Mein Tag“ hinzufügst.',
      recurring: {
        button: 'Wöchentlich wiederholen',
        buttonWithDays: 'Wiederholungen: {days}',
        description:
          'Wähle die Wochentage aus, an denen diese Aufgabe wiederholt werden soll.',
        limitedBySchedule:
          'Es werden nur die Tage angezeigt, die in deinem Arbeitszeitplan hinterlegt sind.',
        autoAddHint:
          'An diesen Tagen wird die Aufgabe automatisch zu „Mein Tag“ hinzugefügt.',
        remove: 'Wöchentliche Wiederholung entfernen',
        weekdaysShort: {
          monday: 'Mo',
          tuesday: 'Di',
          wednesday: 'Mi',
          thursday: 'Do',
          friday: 'Fr',
          saturday: 'Sa',
          sunday: 'So',
        },
      },
    },
    myDayPage: {
      empty: 'Keine Aufgaben zu „Mein Tag“ hinzugefügt',
      goToMyTasks: 'Zu „Meine Aufgaben“ wechseln',
      progress: {
        full: 'Ein großer Tag liegt vor dir – legen wir los!',
        medium: 'Du machst Fortschritte – weiter so!',
        low: 'Fast geschafft – bleib dran!',
        done: 'Alle Aufgaben erledigt! Großartige Arbeit!',
        clearCompleted: 'Erledigte Aufgaben entfernen',
      },
    },
    timer: {
      start: 'Timer starten',
      pause: 'Timer pausieren',
      finished: 'Geplante Zeit für „{task}“ beendet',
    },
    priority: { low: 'Niedrig', medium: 'Mittel', high: 'Hoch' },
    taskList: {
      noTasks: 'Keine Aufgaben',
      noTasksIntro: 'Prüfe deinen Plan. Prüfe deinen Tag.',
      exploreDemoTemplates: 'Demo-Vorlagen erkunden',
    },
    dnd: {
      keyboardInstructions:
        'Drücke die Leertaste, um eine Aufgabe aufzunehmen. Nutze die Pfeiltasten, um sie zu bewegen, drücke erneut die Leertaste, um sie abzulegen, oder drücke Escape, um abzubrechen.',
    },
    tasksView: {
      mobileAddTask: {
        show: 'Aufgabe hinzufügen',
      },
    },
    tagFilter: {
      showAll: 'Alle anzeigen',
      activeIndicator: '(aktiv)',
      confirmDelete:
        'Einige Aufgaben verwenden dieses Etikett. Wenn du es entfernst, verlieren diese Aufgaben das Etikett. Fortfahren?',
      tabsLabel: 'Aufgaben nach Etikett filtern',
    },
    welcomeModal: {
      title: 'CheckPlanner',
      p1: 'Steigere deine Produktivität, plane Aufgaben und organisiere deinen Arbeitsalltag.',
      p2: 'Deine Daten werden lokal gespeichert – nichts wird an einen Server gesendet.',
      p3: 'Exportiere deine Daten, um regelmäßig lokale Backups anzulegen.',
      p4: 'Für den persönlichen Gebrauch entwickelt, nicht für Teams.',
      p5: '100% kostenlos und unbegrenzt, Open Source.',
      cta: 'Los geht’s!',
    },
    notifications: {
      title: 'Benachrichtigungen',
      empty: 'Keine Benachrichtigungen',
      dismiss: 'Benachrichtigung schließen',
      welcome: {
        title: 'Willkommen bei CheckPlanner',
        description:
          'Nutze das Board „Meine Aufgaben“, um alles zu sammeln und zu priorisieren, was du erledigen musst. Verschiebe Einträge in „Mein Tag“, wenn du dich darauf konzentrieren möchtest. Öffne die Einstellungen, um das Theme zu wechseln, deine Daten zu exportieren und mehr.',
        installCta: 'App installieren',
        installUnavailable:
          'Installieren ist nur in unterstützten Browsern verfügbar. Versuche, CheckPlanner über das Browsermenü zu deinem Gerät hinzuzufügen.',
        installInstalled: 'App bereits installiert',
        demoCta: 'Demo-Vorlagen erkunden',
      },
      workScheduleSuggestion: {
        title: 'Arbeitszeit hinzufügen',
        description:
          'Speichere deine Arbeitszeiten, um vor Feierabend eine Planungs-Erinnerung zu erhalten, den nächsten Tag vorzubereiten und produktiv zu starten.',
        cta: 'Arbeitszeit festlegen',
      },
      workReminder: {
        title: 'Morgen planen',
        description:
          'Dein Arbeitstag endet bald. Überprüfe deinen Fortschritt und entscheide, wie es weitergeht.',
      },
      timerFinished: {
        title: 'Geplante Zeit beendet',
        description: 'Eine geplante Zeit ist abgelaufen.',
        untitledTask: 'Aufgabe ohne Titel',
      },
    },
    settingsPage: {
      title: 'Einstellungen',
      subtitle: 'Passe CheckPlanner an',
      description:
        'Steuere Sprache, Erscheinungsbild, Arbeitszeiten und Hinweise an einem Ort.',
      badges: { current: 'Aktiv' },
      sections: {
        general: { title: 'Einstellungen', description: 'Sprache und Daten' },
        appearance: { title: 'Darstellung', description: 'Theme und Layout' },
        workSchedule: {
          title: 'Arbeitszeit',
          description: 'Verfügbarkeit und Erinnerungen',
        },
        notifications: {
          title: 'Benachrichtigungen',
          description: 'Hinweise und Präferenzen',
        },
      },
      general: {
        language: {
          title: 'Sprache',
          description: 'Wähle die Sprache der Oberfläche.',
        },
        data: {
          title: 'Daten und Backups',
          description:
            'Importiere, exportiere oder setze deinen Planer zurück.',
          importHelper: 'Stelle ein früheres Backup (.json) wieder her.',
          exportHelper: 'Lade eine Kopie deiner aktuellen Daten herunter.',
          clearHelper:
            'Dadurch werden alle Aufgaben, Etiketten und Einstellungen entfernt.',
        },
      },
      appearance: {
        theme: {
          title: 'Theme',
          description: 'Wähle den Modus, der zu deinem Arbeitsplatz passt.',
          light: 'Helles Theme',
          lightDescription: 'Helle, klare Oberfläche für den Tag.',
          dark: 'Dunkles Theme',
          darkDescription: 'Abgedunkelte Oberfläche zur Schonung der Augen.',
          active: 'Aktiv',
        },
      },
      workSchedule: {
        title: 'Arbeitszeit',
        description: 'Lege Arbeitszeiten und Erinnerungen fest.',
        helper:
          'Halte deine Verfügbarkeit aktuell, um Erinnerungen und Wiederholungen zu verbessern.',
        cta: 'Arbeitszeit öffnen',
      },
      notifications: {
        title: 'Benachrichtigungen',
        description: 'Bestimme, wie du informiert wirst.',
        helper:
          'Prüfe ungelesene Hinweise oder passe Präferenzen auf der Benachrichtigungsseite an.',
        cta: 'Benachrichtigungen öffnen',
        soundPreferences: {
          title: 'Benachrichtigungstöne',
          description:
            'Aktiviere oder deaktiviere Klänge und wähle für jeden Hinweis einen eigenen Ton.',
          toggleLabel: 'Ton aktivieren',
          selectLabel: 'Ton',
          timerFinished: {
            title: 'Geplante Zeit beendet',
            description:
              'Hinweis, wenn der Planungs-Timer einer Aufgabe endet.',
          },
          workdayReminder: {
            title: 'Erinnerung zum Feierabend',
            description:
              'Erinnerung, den Tag abzuschließen und den nächsten vorzubereiten, bevor du aufhörst.',
          },
        },
        soundOptions: {
          chime: 'Sanftes Läuten',
          bell: 'Klassische Glocke',
          digital: 'Digitaler Ping',
          pulse: 'Puls',
          spark: 'Funkeln',
        },
      },
    },
    workSchedulePage: {
      title: 'Arbeitszeit',
      intro:
        'Speichere deine Arbeitszeiten, damit sich CheckPlanner an deinen Arbeitstag anpasst.',
      calendar: {
        instructions:
          'Klicke und ziehe über die 30-Minuten-Slots, um zu markieren, wann dein Arbeitstag beginnt und endet.',
        timeLabel: 'Zeit',
      },
      week: {
        monday: 'Montag',
        tuesday: 'Dienstag',
        wednesday: 'Mittwoch',
        thursday: 'Donnerstag',
        friday: 'Freitag',
        saturday: 'Samstag',
        sunday: 'Sonntag',
      },
      actions: {
        title: 'Verfügbare Aktionen',
        planningReminder: {
          title: 'Erinnerung, morgen zu planen',
          description:
            'Erhalte kurz vor Feierabend eine Erinnerung, damit du den nächsten Tag organisierst.',
          selectLabel: 'Benachrichtige mich',
          selectSuffix: 'vor dem Ende meines Arbeitstags',
          selectHelper:
            'Wähle aus, wie lange vorher du erinnert werden möchtest.',
          minutes: {
            '5': '5 Min',
            '15': '15 Min',
            '30': '30 Min',
            '60': '1 Std',
          },
          switchLabel: 'Erinnerung aktivieren',
          fillScheduleFirst:
            'Lege zuerst deinen Arbeitszeitplan fest, bevor du diese Erinnerung aktivierst.',
        },
      },
      reminder: {
        toast:
          'Dein Arbeitstag endet bald. Nimm dir einen Moment, um den morgigen Tag zu planen.',
      },
    },
    footer: {
      about: 'Über',
      openSource: 'Open Source',
      faqs: 'FAQs & Support',
      demoTemplates: 'Demo-Vorlagen',
      privacy: 'Datenschutzerklärung',
      terms: 'Nutzungsbedingungen',
    },
    demoTemplatesPage: {
      title: 'Demo-Vorlagen',
      intro:
        'Importiere diese inspirierenden Beispiele dafür, wie verschiedene Berufsrollen CheckPlanner nutzen.',
      confirmExistingTitle: 'Sichere deine Aufgaben, bevor du importierst',
      confirmExistingDescription:
        'Du hast bereits Aufgaben oder Filter gespeichert. Wenn du eine Demo-Vorlage importierst, werden deine aktuellen Daten ersetzt. Exportiere zuerst deine Aufgaben, um keinen Fortschritt zu verlieren. In den Einstellungen findest du Optionen zum Exportieren, Importieren oder Löschen aller Daten.',
      confirmExistingExportCta: 'Aufgaben exportieren',
      confirmExistingContinueCta: 'Demo trotzdem importieren',
      successTitle: 'Demo-Vorlage erfolgreich importiert',
      successDescription:
        'Dein Workspace wurde mit Demo-Daten befüllt. Sieh dir die Aufgaben an, um zu entdecken, wie CheckPlanner diese Rolle unterstützt.',
      successRoleLabel: 'Demo-Rolle:',
      viewDemoCta: 'Demo ansehen',
      roles: {
        techLead: {
          title: 'Technische Leitung',
          description:
            'Als Technische Leitung koordinierst du Incidents, Code-Reviews, Systemüberwachung und langfristige Initiativen und hältst das Team abgestimmt.',
          importCta: 'Demo-Vorlage importieren',
        },
        architect: {
          title: 'Architekt:in',
          description:
            'Architekt:innen balancieren Konzeptentwicklung, Abstimmung mit Fachplanern, Baustellenbegehungen und Genehmigungsunterlagen, während sie Designentscheidungen steuern.',
          importCta: 'Demo-Vorlage importieren',
        },
        graphicDesigner: {
          title: 'Grafikdesigner:in',
          description:
            'Grafikdesigner:innen jonglieren mit Konzeptarbeit, Produktion, Feedback-Runden und Markenführung über digitale und gedruckte Touchpoints.',
          importCta: 'Demo-Vorlage importieren',
        },
        marketingDirector: {
          title: 'Marketing-Direktor:in',
          description:
            'Marketing-Direktor:innen orchestrieren Kampagnen, analysieren Ergebnisse, alignen Teams und berichten an die Unternehmensleitung.',
          importCta: 'Demo-Vorlage importieren',
        },
        productManager: {
          title: 'Product Manager',
          description:
            'Product Manager verbinden Erkenntnisse aus der Discovery, Stakeholder-Abstimmung, Delivery-Umsetzung und Kennzahlen, um Produkterfolg voranzutreiben.',
          importCta: 'Demo-Vorlage importieren',
        },
      },
    },
    aboutPage: {
      title: 'Über CheckPlanner',
      intro:
        'CheckPlanner ist eine kostenlose App, die deine persönliche Produktivität bei der Arbeit steigert.',
      features: {
        freeOpenSource: '100% kostenlos und Open Source.',
        privacy:
          'Alle Informationen bleiben lokal; nichts wird an Server oder Dritte gesendet. Verwende die App nur auf deinen privaten Geräten.',
        fast: 'Schnell und ohne Registrierung: Alles wird im Browser gespeichert, keine Daten werden geteilt.',
        personal:
          'Für den persönlichen Gebrauch – keine Accounts oder Teamfunktionen.',
        export:
          'Exportiere und importiere deine Daten, um Backups zu erstellen oder auf ein anderes Gerät zu wechseln.',
        myTasks:
          'Füge Aufgaben strukturiert hinzu, versehe sie mit Etiketten und Prioritäten.',
        myDay:
          'Plane deinen Arbeitstag, indem du auswählst, welche Aufgaben du an jedem Tag erledigen möchtest.',
      },
      sourceCode: 'Der Quellcode ist verfügbar auf',
      learnMore: 'Erfahre mehr in unseren',
      and: 'und',
    },
    faqs: {
      title: 'Häufig gestellte Fragen',
      intro:
        'Finde Antworten auf die häufigsten Fragen, um das Beste aus CheckPlanner herauszuholen.',
      q1: {
        question: 'Was ist CheckPlanner?',
        answer:
          'CheckPlanner ist eine persönliche Produktivitäts-App, die deinen Arbeitsalltag direkt im Browser organisiert und einfache Boards mit schnellen Aktionen kombiniert, damit du fokussiert bleibst.',
      },
      q2: {
        question: 'Was kostet CheckPlanner?',
        answer:
          'CheckPlanner ist komplett kostenlos, bietet unbegrenzte Planung und ist als Open Source veröffentlicht, sodass du es jederzeit prüfen oder erweitern kannst.',
      },
      q3: {
        question: 'Gibt es eine Registrierung oder Anmeldung?',
        answer:
          'Es ist kein Account nötig. CheckPlanner läuft privat auf deinem Gerät, lädt sofort und bleibt schnell und ablenkungsfrei – ganz ohne Anmeldeprozess.',
      },
      q4: {
        question: 'Wo werden meine Daten gespeichert?',
        answer:
          'Alle Aufgaben, Board-Einstellungen und Präferenzen werden lokal in deinem Browser gespeichert. Nichts verlässt dein Gerät und du kannst deinen Workspace jederzeit exportieren, um Backups zu erstellen.',
      },
      q5: {
        question: 'Werden meine Informationen mit Dritten geteilt?',
        answer:
          'Nein. CheckPlanner sendet keine Analysen, Telemetrie oder Aufgabendaten an externe Dienste – alles bleibt lokal auf deinem Gerät.',
      },
      q6: {
        question: 'Kann ich auf einem anderen Gerät weiterplanen?',
        answer:
          'Ja. Exportiere deinen aktuellen Plan als JSON-Datei und importiere ihn auf einem anderen Gerät, um genau dort weiterzumachen, wo du aufgehört hast.',
      },
      q7: {
        question: 'Gibt es Tastenkürzel, um meine Aufgaben zu verwalten?',
        answer:
          'Ja. In „Mein Tag“ kannst du mit der Leertaste eine Aufgabe auswählen und mit den Pfeiltasten sofort verschieben.',
      },
      q8: {
        question: 'Kann ich Theme oder Sprache ändern?',
        answer:
          'Ja. Nutze die Steuerelemente im Header oder öffne die Einstellungen, um zwischen hellem und dunklem Modus zu wechseln und deine bevorzugte Sprache auszuwählen.',
      },
      supportTitle: 'Support',
      support:
        'Brauchst du weitere Hilfe? Verwende unsere GitHub-Issues, um Probleme oder Vorschläge zu melden.',
      supportLink: 'Issue erstellen',
    },
    privacyPage: {
      title: 'Datenschutzerklärung',
      intro:
        'CheckPlanner ist eine Client-Anwendung. Wir respektieren deine Privatsphäre und sammeln keine personenbezogenen Daten.',
      localData: {
        title: 'Lokale Daten',
        description:
          'Alle Listen, benutzerdefinierten Spalten und Aufgabenstände werden direkt in deinem Browser verarbeitet, ganz ohne Account. Wir speichern diese Informationen im lokalen Speicher des Browsers zusammen mit Einstellungen wie Sprache, Theme und ausgeblendeten Hinweisen. Die Daten bleiben auf deinem Gerät, es sei denn, du exportierst oder löschst sie manuell, zum Beispiel durch das Leeren des Browser-Caches oder die Reset-Aktionen der App.',
      },
      analytics: {
        title: 'Analyse',
        description:
          'Die Anwendung verwendet keine Analysen oder Tracking-Cookies.',
      },
      contact: {
        title: 'Kontakt',
        description: 'Wenn du Fragen hast, melde dich über die GitHub-Issues.',
      },
    },
    termsPage: {
      title: 'Nutzungsbedingungen',
      intro:
        'Durch die Nutzung von CheckPlanner stimmst du den folgenden Bedingungen zu.',
      usage: {
        title: 'Nutzung der Anwendung',
        description:
          'Die App wird „wie besehen“ ohne Gewähr bereitgestellt. Du bist für deine Daten verantwortlich.',
      },
      privacy: {
        title: 'Datenschutz',
        description:
          'Weitere Informationen zur Datenverarbeitung findest du in unserer',
      },
      liability: {
        title: 'Haftungsbeschränkung',
        description:
          'Wir übernehmen keine Haftung für Schäden oder Datenverluste, die aus der Nutzung der App entstehen.',
      },
      changes: {
        title: 'Änderungen dieser Bedingungen',
        description:
          'Wir können diese Bedingungen jederzeit aktualisieren. Durch die weitere Nutzung der App akzeptierst du die neuen Bedingungen.',
      },
      contact: {
        title: 'Kontakt',
        description: 'Wenn du Fragen hast, melde dich über die GitHub-Issues.',
      },
    },
    lang: {
      en: 'Englisch',
      es: 'Spanisch',
      fr: 'Französisch',
      it: 'Italienisch',
      de: 'Deutsch',
    },
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  language: 'en',
  setLanguage: () => {},
  t: key => key,
});

function getTranslation(lang: Language, key: string): string {
  const parts = key.split('.');
  let result: any = translations[lang];
  for (const part of parts) {
    if (result && typeof result === 'object') {
      result = result[part];
    } else {
      result = undefined;
      break;
    }
  }
  return typeof result === 'string' ? result : key;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lang');
      if (stored && LANGUAGES.includes(stored as Language)) {
        return stored as Language;
      }
      const browser = navigator.language.split('-')[0];
      return LANGUAGES.includes(browser as Language)
        ? (browser as Language)
        : 'en';
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('lang', language);
  }, [language]);

  const t = (key: string) => getTranslation(language, key);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
