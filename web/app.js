(function () {
    const STORAGE_KEY = 'luna-web-state-v1';
    const DEFAULT_PROFILE_PHOTO_URL = './luna-default-profile.jpg';
    const DEFAULT_PROFILE = {
        name: '루나',
        gender: 'female',
        genderLabel: '여아',
        birthDate: '2024-11-28',
        photoUrl: DEFAULT_PROFILE_PHOTO_URL,
        wakeTime: '07:00',
        napTime: '12:30',
        bedTime: '20:20',
        favoriteFoods: ['바나나', '두부', '미역국'],
        dislikedFoods: ['브로콜리', '당근'],
        frequentPlaces: ['공원', '병원'],
    };

    const HELP_CARDS = [
        { id: 'meal_refusal', category: 'meal', categoryLabel: '식사', title: '밥 안 먹어요', scenario: '루나가 몇 입 먹고 고개를 돌리거나 의자에서 내려오려고 해요.', steps: ['억지로 먹이지 않고 10분 안에 식사를 정리해요.', '간식으로 바로 바꾸지 말고 다음 식사 리듬을 유지해요.', '양보다 분위기를 편하게 유지하고 익숙한 음식 한두 가지만 남겨요.'], avoidTips: ['식사 시간을 길게 끌기', '안 먹는다고 바로 다른 간식 주기'], examplePhrase: '루나, 지금은 밥 먹는 시간이야. 다 먹지 않아도 밥 시간은 마무리할게.' },
        { id: 'spoon_throw', category: 'meal', categoryLabel: '식사', title: '숟가락을 던져요', scenario: '먹다가 숟가락이나 컵을 바닥으로 던져 반응을 살펴봐요.', steps: ['짧고 차분하게 안 된다는 규칙만 말해요.', '던지면 잠깐 식사를 멈추고 숟가락을 다시 쥐여줘요.', '반복되면 그날 식사는 간단히 마무리해요.'], avoidTips: ['웃으면서 놀이처럼 반응하기', '길게 혼내기'], examplePhrase: '루나, 숟가락은 던지는 게 아니야. 밥 먹을 준비가 되면 다시 줄게.' },
        { id: 'snack_only', category: 'meal', categoryLabel: '식사', title: '간식만 찾으려고 해요', scenario: '정식 식사보다 빵이나 과일 같은 간식만 계속 찾으려고 해요.', steps: ['간식 시간을 정해두고 식사 직전 간식은 줄여요.', '식사 자리에는 익숙한 음식과 새 음식 하나만 올려요.', '간식 요청이 와도 다음 간식 시간을 짧게 알려줘요.'], avoidTips: ['식사를 건너뛴 보상처럼 간식 주기', '먹일 때마다 메뉴를 계속 바꾸기'], examplePhrase: '루나, 과일은 간식 시간에 먹고 지금은 밥 시간이야.' },
        { id: 'tantrum', category: 'behavior', categoryLabel: '감정/행동', title: '떼써요', scenario: '원하는 걸 바로 못 하면 울고 바닥에 드러눕거나 소리를 질러요.', steps: ['안전만 먼저 확인하고 감정을 짧게 읽어줘요.', '지금 가능한 선택지 한두 개만 제시해요.', '진정되면 같은 규칙을 다시 짧게 알려줘요.'], avoidTips: ['울음을 멈추게 하려고 바로 허용하기', '설명을 너무 길게 하기'], examplePhrase: '루나가 더 하고 싶었구나. 지금은 끝났고, 물 마실지 안아줄지 골라보자.' },
        { id: 'clingy', category: 'behavior', categoryLabel: '감정/행동', title: '안아달라고만 해요', scenario: '계속 안아달라고 하거나 내려놓으면 바로 울어요.', steps: ['짧게 안아주고 언제 내려놓을지 미리 말해줘요.', '내려놓은 뒤 바로 할 수 있는 짧은 놀이로 연결해요.', '안아주기와 혼자 놀이 시간을 작게 번갈아 연습해요.'], avoidTips: ['말없이 갑자기 내려놓기', '계속 참다가 한 번에 크게 화내기'], examplePhrase: '루나 안아줄게. 세 번 꼭 안고 내려와서 같이 블록 놀자.' },
        { id: 'outing_resist', category: 'behavior', categoryLabel: '감정/행동', title: '외출 전에 버텨요', scenario: '옷 입기나 신발 신기 전에 도망가거나 몸을 빼요.', steps: ['외출 직전보다 5분 전에 먼저 알려줘요.', '양말부터 신을지 겉옷부터 입을지 고르게 해요.', '준비가 끝나면 바로 문 앞 행동으로 이어가요.'], avoidTips: ['출발 직전에 한꺼번에 재촉하기', '모든 과정을 부모가 밀어붙이기'], examplePhrase: '루나, 이제 공원 갈 준비하자. 신발 먼저 신을까, 겉옷 먼저 입을까?' },
        { id: 'play_five_minutes', category: 'play', categoryLabel: '놀이', title: '집에서 5분 놀이', scenario: '외출은 어렵고 잠깐 집중할 놀이가 필요해요.', steps: ['컵이나 통을 준비해 넣고 꺼내는 놀이를 해요.', '색깔 두 개만 정해서 같은 것끼리 담아봐요.', '끝날 때는 정리까지 놀이처럼 이어줘요.'], avoidTips: ['장난감을 너무 많이 한 번에 꺼내기', '정답을 계속 알려주기'], examplePhrase: '루나, 이번엔 노란 컵을 여기 넣어볼까? 다 하면 같이 정리하자.' },
        { id: 'play_energy', category: 'play', categoryLabel: '놀이', title: '에너지 빼는 놀이', scenario: '집 안에서 몸을 좀 써야 저녁이 편해질 것 같아요.', steps: ['쿠션 두세 개로 짧은 길을 만들어 걸어보게 해요.', '노래에 맞춰 스쿼트나 점프 흉내를 같이 해요.', '마지막은 물 마시기와 호흡으로 마무리해요.'], avoidTips: ['잠들기 직전에 과하게 흥분시키기', '넘어질 수 있는 가구 옆에서 하기'], examplePhrase: '루나, 쿠션 길 따라 한 발씩 가보자. 끝나면 물 마시러 가자.' },
        { id: 'play_language', category: 'play', categoryLabel: '놀이', title: '말 걸기 놀이', scenario: '짧은 일상 속에서 단어와 표현을 늘리고 싶어요.', steps: ['루나가 가리키는 물건 이름을 짧게 반복해줘요.', '하나씩 골라보는 질문을 자주 던져요.', '정확히 말하지 않아도 따라 말한 시도를 바로 칭찬해요.'], avoidTips: ['발음을 계속 고쳐주기', '질문을 연달아 너무 많이 던지기'], examplePhrase: '루나, 공? 컵? 뭐가 좋을까. 맞아, 공이네.' },
        { id: 'outing_prepare', category: 'outing', categoryLabel: '외출', title: '외출 준비', scenario: '공원이나 병원 가기 전에 꼭 챙길 것만 빠르게 보고 싶어요.', steps: ['물, 간식, 기저귀, 물티슈만 먼저 챙겨요.', '이동 시간에 맞춰 여벌옷 여부만 추가로 확인해요.', '루나에게 어디 가는지 짧게 말해줘요.'], avoidTips: ['매번 체크리스트를 새로 다 생각하기', '나가기 직전에만 급하게 준비하기'], examplePhrase: '루나, 이제 공원 갈 거야. 물이랑 간식 챙기고 바로 나가자.' },
        { id: 'hospital_prepare', category: 'outing', categoryLabel: '외출', title: '병원 가기 전', scenario: '대기 시간이 있어도 루나가 버틸 수 있게 준비하고 싶어요.', steps: ['예약 시간과 최근 식사, 배변 정도만 먼저 확인해요.', '짧게 집중할 수 있는 작은 장난감 하나만 챙겨요.', '대기 중엔 간식보다 물과 짧은 놀이를 먼저 써요.'], avoidTips: ['장난감을 너무 많이 챙기기', '설명을 길게 반복하기'], examplePhrase: '루나, 오늘은 병원 다녀오고 집에 와서 쉬자.' },
        { id: 'car_ride', category: 'outing', categoryLabel: '외출', title: '차 타기 전', scenario: '카시트 타기 싫어하고 출발 전에 버티는 날이 있어요.', steps: ['타기 전에 어디까지 가는지 짧게 말해줘요.', '차에 타면 바로 줄 수 있는 노래나 장난감을 하나 정해둬요.', '출발 전 1분은 부모도 서두르지 않고 톤을 낮춰요.'], avoidTips: ['카시트 앞에서 오래 실랑이하기', '매번 다른 보상으로 달래기'], examplePhrase: '루나, 이제 차 타고 공원 갈 거야. 노래 듣고 금방 도착해.' },
    ];

    const QUICK_LOGS = [
        { type: 'Meal', label: '식사', description: '잘 먹음 / 거부' },
        { type: 'Nap', label: '낮잠', description: '길이 중심 기록' },
        { type: 'Diaper', label: '기저귀', description: '소변 / 대변' },
        { type: 'Outing', label: '외출', description: '공원 / 병원' },
    ];
    const LOG_TYPE_LABELS = Object.fromEntries(QUICK_LOGS.map((item) => [item.type, item.label]));
    const QUICK_HELP_IDS = ['meal_refusal', 'tantrum', 'play_five_minutes', 'outing_prepare'];
    const NAP_OPTIONS = [30, 45, 60, 75, 90, 120];
    const HELP_GROUP_ORDER = [
        { value: 'meal', label: '식사' },
        { value: 'behavior', label: '감정/행동' },
        { value: 'play', label: '놀이' },
        { value: 'outing', label: '외출' },
    ];
    const MEAL_KINDS = [
        { value: 'breakfast', label: '아침' },
        { value: 'lunch', label: '점심' },
        { value: 'dinner', label: '저녁' },
        { value: 'snack', label: '간식' },
    ];
    const MEAL_STATUSES = [
        { value: 'ateWell', label: '잘 먹음' },
        { value: 'ateHalf', label: '반만 먹음' },
        { value: 'refused', label: '거부' },
        { value: 'spitOut', label: '뱉음' },
    ];
    const MEAL_TAGS = [
        { value: 'liked', label: '좋아함' },
        { value: 'resisted', label: '거부함' },
        { value: 'usedSpoon', label: '숟가락 사용' },
        { value: 'ateByHand', label: '손으로 먹음' },
    ];
    const DIAPER_KINDS = [
        { value: 'wet', label: '소변' },
        { value: 'dirty', label: '대변' },
        { value: 'both', label: '둘 다' },
    ];
    const DIAPER_CONDITIONS = [
        { value: 'none', label: '없음' },
        { value: 'loose', label: '묽음' },
        { value: 'hard', label: '딱딱함' },
    ];
    const OUTING_KINDS = [
        { value: 'park', label: '공원' },
        { value: 'hospital', label: '병원' },
        { value: 'mart', label: '마트' },
        { value: 'carRide', label: '차 타기' },
    ];
    const OUTING_CHECKLIST = ['\uBB3C', '\uAC04\uC2DD', '\uAE30\uC800\uADC0', '\uBB3C\uD2F0\uC288', '\uC5EC\uBC8C\uC637'];
    const SOUND_PRESETS = {
        tap: [{ frequency: 660, duration: 0.04, volume: 0.11, type: 'triangle', slideTo: 540 }],
        select: [{ frequency: 460, duration: 0.05, volume: 0.09, type: 'sine', slideTo: 560 }],
        type: [{ frequency: 780, duration: 0.018, volume: 0.045, type: 'triangle', slideTo: 730 }],
        success: [
            { frequency: 520, duration: 0.05, volume: 0.08, type: 'sine' },
            { frequency: 720, duration: 0.07, volume: 0.11, type: 'sine', delay: 0.045 },
        ],
        delete: [{ frequency: 290, duration: 0.08, volume: 0.1, type: 'triangle', slideTo: 190 }],
        close: [{ frequency: 430, duration: 0.045, volume: 0.06, type: 'sine', slideTo: 330 }],
        photo: [
            { frequency: 640, duration: 0.04, volume: 0.08, type: 'triangle' },
            { frequency: 860, duration: 0.055, volume: 0.09, type: 'triangle', delay: 0.04 },
        ],
    };

    const APP = document.getElementById('app');
    const MODAL_ROOT = document.getElementById('modal-root');
    const UI = { activeTab: 'today', helpSearch: '', helpCategory: 'all', modal: null };
    const SOUND_ENGINE = createSoundEngine();
    let state = loadState();

    APP.addEventListener('click', handleAppClick);
    APP.addEventListener('input', handleAppInput);
    APP.addEventListener('change', handleFormChange);
    APP.addEventListener('submit', handleModalSubmit);
    MODAL_ROOT.addEventListener('click', handleModalClick);
    MODAL_ROOT.addEventListener('input', handleAppInput);
    MODAL_ROOT.addEventListener('change', handleFormChange);
    MODAL_ROOT.addEventListener('submit', handleModalSubmit);

    render();

    function loadState() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return createDefaultState();
            return normalizeState(JSON.parse(raw));
        } catch (error) {
            return createDefaultState();
        }
    }

    function createDefaultState() {
        return {
            profile: { ...DEFAULT_PROFILE },
            session: { hasCompletedOnboarding: false, pinnedHelpCardId: null },
            logs: createInitialLogs(),
        };
    }

    function normalizeState(input) {
        const fallback = createDefaultState();
        const profile = input && input.profile ? {
            ...fallback.profile,
            ...input.profile,
            name: DEFAULT_PROFILE.name,
            gender: DEFAULT_PROFILE.gender,
            genderLabel: DEFAULT_PROFILE.genderLabel,
            birthDate: DEFAULT_PROFILE.birthDate,
            photoUrl: valueOrFallback(input.profile.photoUrl || input.profile.photoDataUrl, fallback.profile.photoUrl),
            favoriteFoods: normalizeList(input.profile.favoriteFoods, fallback.profile.favoriteFoods),
            dislikedFoods: normalizeList(input.profile.dislikedFoods, fallback.profile.dislikedFoods),
            frequentPlaces: normalizeList(input.profile.frequentPlaces, fallback.profile.frequentPlaces),
        } : fallback.profile;
        const session = input && input.session ? {
            hasCompletedOnboarding: Boolean(input.session.hasCompletedOnboarding),
            pinnedHelpCardId: input.session.pinnedHelpCardId || null,
        } : fallback.session;
        const logs = Array.isArray(input && input.logs) && input.logs.length > 0 ? input.logs.map(normalizeLog).sort(sortLogsDesc) : fallback.logs;
        return { profile, session, logs };
    }

    function normalizeLog(log) {
        const createdAt = typeof log.createdAt === 'string' ? log.createdAt : new Date().toISOString();
        const type = log.type || 'Meal';
        const base = {
            id: log.id || generateId(type.toLowerCase()),
            type,
            typeLabel: LOG_TYPE_LABELS[type] || '기록',
            title: log.title || '기록',
            detail: log.detail || '',
            createdAt,
            status: log.status || null,
            durationMinutes: typeof log.durationMinutes === 'number' ? log.durationMinutes : null,
            note: log.note || null,
        };
        return { ...base, payload: normalizePayload(base, log.payload || null) };
    }

    function normalizePayload(log, payload) {
        if (payload && typeof payload === 'object') return payload;
        if (log.type === 'Meal') {
            return {
                kind: MEAL_KINDS.find((item) => item.label === log.title)?.value || 'lunch',
                status: MEAL_STATUSES.find((item) => item.label === log.status)?.value || 'ateWell',
                tags: MEAL_TAGS.filter((item) => log.detail.includes(item.label)).map((item) => item.value),
                note: log.note || '',
            };
        }
        if (log.type === 'Nap') return { durationMinutes: log.durationMinutes || parseDurationMinutes(log.detail) || 60, note: log.note || '' };
        if (log.type === 'Diaper') {
            return {
                kind: DIAPER_KINDS.find((item) => log.detail.includes(item.label) || log.title === item.label)?.value || 'wet',
                condition: DIAPER_CONDITIONS.find((item) => item.value !== 'none' && log.detail.includes(item.label))?.value || 'none',
                note: log.note || '',
            };
        }
        return {
            kind: OUTING_KINDS.find((item) => item.label === log.title)?.value || 'park',
            checklist: log.detail.split('·').slice(1).join('·').split(',').map((value) => value.trim()).filter(Boolean),
            note: log.note || '',
        };
    }

    function persist() {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function commit() {
        persist();
        render();
    }

    function createSoundEngine() {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        let audioContext = null;
        let masterGain = null;
        let lastTypeAt = 0;
        let disabled = false;

        function ensureContext() {
            if (disabled || !AudioContextClass) return null;
            try {
                if (!audioContext) {
                    audioContext = new AudioContextClass();
                    masterGain = audioContext.createGain();
                    masterGain.gain.value = 0.22;
                    masterGain.connect(audioContext.destination);
                }
                if (audioContext.state === 'suspended') Promise.resolve(audioContext.resume()).catch(() => {});
                return audioContext;
            } catch (error) {
                disabled = true;
                return null;
            }
        }

        function scheduleNote(ctx, preset, startAt) {
            if (!masterGain) return;
            const oscillator = ctx.createOscillator();
            const noteGain = ctx.createGain();
            const attack = 0.005;
            const duration = Math.max(0.01, preset.duration || 0.05);
            const releaseStart = startAt + Math.max(duration * 0.42, attack);
            const endAt = startAt + duration;

            oscillator.type = preset.type || 'sine';
            oscillator.frequency.setValueAtTime(preset.frequency || 440, startAt);
            if (preset.slideTo) oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, preset.slideTo), endAt);

            noteGain.gain.setValueAtTime(0.0001, startAt);
            noteGain.gain.exponentialRampToValueAtTime(Math.max(0.0002, preset.volume || 0.06), startAt + attack);
            noteGain.gain.exponentialRampToValueAtTime(0.0001, releaseStart);
            noteGain.gain.linearRampToValueAtTime(0.00001, endAt + 0.015);

            oscillator.connect(noteGain);
            noteGain.connect(masterGain);
            oscillator.start(startAt);
            oscillator.stop(endAt + 0.02);
        }

        function playPreset(name) {
            const preset = SOUND_PRESETS[name];
            if (!preset || preset.length === 0) return;
            const ctx = ensureContext();
            if (!ctx) return;
            const startAt = ctx.currentTime + 0.01;
            preset.forEach((note) => scheduleNote(ctx, note, startAt + (note.delay || 0)));
        }

        return {
            play(name) {
                if (!name) return;
                playPreset(name);
            },
            playType() {
                const now = Date.now();
                if (now - lastTypeAt < 70) return;
                lastTypeAt = now;
                playPreset('type');
            },
        };
    }

    function playUiSound(name) {
        SOUND_ENGINE.play(name);
    }

    function playTypingSound() {
        SOUND_ENGINE.playType();
    }

    function isTextEntryTarget(target) {
        const tagName = String(target && target.tagName || '').toUpperCase();
        if (tagName === 'TEXTAREA') return true;
        if (tagName !== 'INPUT') return false;
        const type = String(target.type || 'text').toLowerCase();
        return ['text', 'search', 'number', 'time', 'email', 'tel', 'url'].includes(type);
    }

    function render() {
        APP.innerHTML = state.session.hasCompletedOnboarding ? renderShell() : renderOnboarding();
        MODAL_ROOT.innerHTML = renderModal();
    }

    function renderOnboarding() {
        return `
            <section class="onboarding-shell">
                <div class="hero-panel">
                    <span class="hero-eyebrow">루나 전용 시작 설정</span>
                    <h1 class="hero-title">루나를 위한 웹 육아 보드</h1>
                    <p class="hero-copy">설치 없이 브라우저에서 바로 쓰는 루나 전용 육아 보드예요. 루나의 기본 정보는 이미 맞춰두었고, 사진과 생활 리듬만 다듬으면 바로 시작할 수 있어요.</p>
                    ${renderProfileHero(state.profile, 'welcome')}
                </div>
                <section class="surface-card" style="margin-top: 18px;">
                    <div class="section-head">
                        <div>
                            <h2 class="section-title">시작 설정</h2>
                            <p class="section-note">루나의 고정 정보는 이미 입력돼 있어요. 생활 리듬과 음식 취향만 가볍게 맞춰주세요.</p>
                        </div>
                    </div>
                    ${renderProfileForm(state.profile, 'onboarding', '시작하기')}
                </section>
            </section>
        `;
    }

    function renderShell() {
        return `
            <section class="app-shell">
                <header class="hero-panel">
                    <span class="hero-eyebrow">Luna Daily Web</span>
                    <h1 class="hero-title">루나의 오늘을 브라우저에서 바로 관리해요</h1>
                    <p class="hero-copy">루나 한 명만을 위한 웹 육아 보드예요. 복잡한 통계보다 오늘 흐름, 빠른 기록, 바로 꺼내 보는 도움 카드에 집중했어요.</p>
                    ${renderProfileHero(state.profile, 'compact')}
                    <div class="hero-metrics">
                        <div class="metric-card"><span class="metric-label">현재 월령</span><strong class="metric-value">${escapeHtml(String(getAgeInMonths(state.profile.birthDate)))}개월</strong></div>
                        <div class="metric-card"><span class="metric-label">고정 도움</span><strong class="metric-value">${escapeHtml(findHelpCard(state.session.pinnedHelpCardId)?.title || '아직 없음')}</strong></div>
                        <div class="metric-card"><span class="metric-label">최근 기록</span><strong class="metric-value">${escapeHtml(String(state.logs.length))}개</strong></div>
                    </div>
                </header>
                ${UI.activeTab === 'records' ? renderRecords() : UI.activeTab === 'help' ? renderHelp() : renderToday()}
                <nav class="tab-bar" aria-label="메인 탭">
                    ${renderTabButton('today', '오늘')}
                    ${renderTabButton('records', '기록')}
                    ${renderTabButton('help', '도움')}
                </nav>
            </section>
        `;
    }

    function renderProfileHero(profile, variant) {
        const isCompact = variant === 'compact';
        const note = isCompact ? '루나 한 명 기준으로 기본 정보와 프로필 사진을 고정해뒀어요.' : '기본 정보는 이미 채워져 있어요. 사진과 생활 리듬만 맞추면 바로 쓸 수 있어요.';
        return `
            <div class="profile-hero${isCompact ? ' compact' : ''}">
                <img class="profile-avatar ${isCompact ? 'medium' : 'large'}" src="${escapeHtml(profile.photoUrl || DEFAULT_PROFILE.photoUrl)}" alt="루나 프로필 사진">
                <div class="profile-identity-copy">
                    <p class="profile-name">${escapeHtml(profile.name)}</p>
                    <p class="profile-fixed">${escapeHtml(renderFixedProfileMeta(profile))}</p>
                    <p class="profile-fixed-note">${escapeHtml(note)}</p>
                </div>
            </div>
        `;
    }

    function renderFixedProfileMeta(profile) {
        return `${formatBirthDateLong(profile.birthDate)}생 · ${profile.genderLabel}`;
    }

    function renderTabButton(tab, label) {
        return `<button class="tab-button ${UI.activeTab === tab ? 'active' : ''}" data-action="switch-tab" data-tab="${tab}">${label}</button>`;
    }

    function renderToday() {
        const todayState = deriveTodayState();
        return `
            <section class="grid-layout">
                <div class="section-stack">
                    <section class="surface-card">
                        <div class="section-head">
                            <div>
                                <h2 class="section-title">루나의 오늘</h2>
                                <p class="section-note">${escapeHtml(todayState.ageLabel)}</p>
                            </div>
                            <button class="secondary-button" data-action="open-profile">프로필 편집</button>
                        </div>
                        <div class="info-card next">
                            <h3 class="info-title">${escapeHtml(todayState.headline)}</h3>
                            <p class="info-body">${escapeHtml(todayState.nextAction.body)}</p>
                            ${todayState.nextAction.helpCardId ? `<div class="form-actions"><button class="primary-button" data-action="open-help" data-card-id="${todayState.nextAction.helpCardId}">${escapeHtml(todayState.nextAction.ctaLabel)}</button></div>` : ''}
                        </div>
                    </section>
                    <section class="surface-card">
                        <div class="section-head"><div><h2 class="section-title">빠른 기록</h2><p class="section-note">자주 쓰는 4가지만 남겨서 바로 눌러 기록해요.</p></div></div>
                        <div class="quick-actions">
                            ${QUICK_LOGS.map((item) => `<button class="quick-button" data-action="open-log-form" data-log-type="${item.type}">${item.label}<small>${item.description}</small></button>`).join('')}
                        </div>
                    </section>
                    <section class="surface-card">
                        <div class="section-head"><div><h2 class="section-title">오늘 요약</h2><p class="section-note">루나의 최근 흐름을 한눈에 정리해요.</p></div></div>
                        <div class="summary-grid">
                            ${todayState.summaryRows.map((row) => `<div class="summary-row"><span class="summary-label">${escapeHtml(row.label)}</span><strong class="summary-value">${escapeHtml(row.value)}</strong></div>`).join('')}
                        </div>
                    </section>
                </div>
                <aside class="section-stack">
                    <section class="surface-card tight">
                        <div class="section-head"><div><h2 class="section-title">루나 맞춤 도움</h2><p class="section-note">지금 자주 꺼낼 것만 짧게 모았어요.</p></div></div>
                        <div class="card-grid">${todayState.quickHelpCards.map((card) => renderHelpCard(card)).join('')}</div>
                    </section>
                    <section class="surface-card tight">
                        <div class="section-head"><div><h2 class="section-title">생활 기준선</h2><p class="section-note">프로필에서 설정한 루나의 기본 리듬이에요.</p></div></div>
                        <div class="tag-list">
                            <span class="tag-pill">기상 ${escapeHtml(formatClockLabel(state.profile.wakeTime))}</span>
                            <span class="tag-pill">낮잠 ${escapeHtml(formatClockLabel(state.profile.napTime))}</span>
                            <span class="tag-pill">취침 ${escapeHtml(formatClockLabel(state.profile.bedTime))}</span>
                        </div>
                    </section>
                </aside>
            </section>
        `;
    }

    function renderRecords() {
        const recordsState = deriveRecordsState();
        return `
            <section class="section-stack">
                <section class="surface-card">
                    <div class="section-head"><div><h2 class="section-title">최근 기록</h2><p class="section-note">기록을 누르면 상세 확인, 수정, 삭제까지 바로 할 수 있어요.</p></div></div>
                    <div class="stack-list">
                        ${recordsState.timeline.length > 0 ? recordsState.timeline.map((log) => renderRecordCard(log)).join('') : `<div class="empty-state">아직 기록이 없어요. 식사나 외출을 하나만 남겨도 루나의 하루 흐름이 정리돼요.</div>`}
                    </div>
                </section>
                <section class="grid-layout">
                    <section class="surface-card tight">
                        <div class="section-head"><div><h2 class="section-title">최근 7일 요약</h2><p class="section-note">자주 흔들리는 부분만 빠르게 체크해요.</p></div></div>
                        <div class="summary-grid">
                            <div class="summary-row"><span class="summary-label">점심 거부</span><strong class="summary-value">${escapeHtml(String(recordsState.summary.lunchRefusalCount))}회</strong></div>
                            <div class="summary-row"><span class="summary-label">낮잠 평균</span><strong class="summary-value">${escapeHtml(formatDuration(recordsState.summary.averageNapMinutes))}</strong></div>
                            <div class="summary-row"><span class="summary-label">외출 횟수</span><strong class="summary-value">${escapeHtml(String(recordsState.summary.outingCount))}회</strong></div>
                        </div>
                    </section>
                    <section class="surface-card tight">
                        <div class="section-head"><div><h2 class="section-title">자주 본 도움 카드</h2><p class="section-note">기록 흐름에서 자주 필요했던 카드예요.</p></div></div>
                        <div class="stack-list">${recordsState.frequentHelpTitles.map((title) => `<div class="ghost-card">${escapeHtml(title)}</div>`).join('')}</div>
                    </section>
                </section>
            </section>
        `;
    }

    function renderHelp() {
        const filteredCards = getFilteredHelpCards();
        const grouped = HELP_GROUP_ORDER.map((category) => ({ category, cards: filteredCards.filter((card) => card.category === category.value) })).filter((group) => group.cards.length > 0);
        return `
            <section class="section-stack">
                <section class="surface-card">
                    <div class="section-head"><div><h2 class="section-title">빠른 도움</h2><p class="section-note">루나에게 가장 자주 펼쳐볼 카드만 먼저 뽑아놨어요.</p></div></div>
                    <div class="quick-chip-row">${QUICK_HELP_IDS.map((cardId) => findHelpCard(cardId)).filter(Boolean).map((card) => `<button class="quick-chip" data-action="open-help" data-card-id="${card.id}">${escapeHtml(card.title)}</button>`).join('')}</div>
                </section>
                <section class="surface-card">
                    <div class="section-head"><div><h2 class="section-title">도움 검색</h2><p class="section-note">밥, 떼쓰기, 외출 같은 상황을 바로 찾을 수 있어요.</p></div></div>
                    <div class="search-shell">
                        <input class="search-input" data-input="help-search" type="search" placeholder="예: 밥, 떼쓰기, 외출" value="${escapeHtml(UI.helpSearch)}">
                        <div class="filter-row">
                            <button class="filter-chip ${UI.helpCategory === 'all' ? 'active' : ''}" data-action="filter-help" data-category="all">전체</button>
                            ${HELP_GROUP_ORDER.map((category) => `<button class="filter-chip ${UI.helpCategory === category.value ? 'active' : ''}" data-action="filter-help" data-category="${category.value}">${escapeHtml(category.label)}</button>`).join('')}
                        </div>
                    </div>
                </section>
                ${grouped.length > 0 ? grouped.map((group) => `<section class="surface-card tight"><div class="section-head"><div><h2 class="section-title">${escapeHtml(group.category.label)}</h2></div></div><div class="help-grid">${group.cards.map((card) => renderHelpCard(card)).join('')}</div></section>`).join('') : `<section class="surface-card"><div class="empty-state">찾는 도움 카드가 없어요. 검색어를 바꾸거나 카테고리 필터를 풀어보세요.</div></section>`}
            </section>
        `;
    }

    function renderHelpCard(card) {
        return `<button class="help-card" data-action="open-help" data-card-id="${card.id}"><p class="record-card-meta">${escapeHtml(card.categoryLabel)}</p><h3 class="help-card-title">${escapeHtml(card.title)}</h3><p class="help-card-copy">${escapeHtml(card.scenario)}</p></button>`;
    }

    function renderRecordCard(log) {
        return `<button class="record-card" data-action="open-record" data-log-id="${log.id}"><p class="record-card-meta">${escapeHtml(formatRecordMoment(log.createdAt))}</p><h3 class="record-card-title">${escapeHtml(log.typeLabel)} · ${escapeHtml(log.title)}</h3><p class="record-card-copy">${escapeHtml(formatLogSummary(log))}</p>${log.note ? `<p class="record-card-note">${escapeHtml(log.note)}</p>` : ''}</button>`;
    }

    function renderModal() {
        if (!UI.modal) return '';
        if (UI.modal.type === 'profile') return wrapModal('루나 프로필 편집', '루나의 생활 리듬과 자주 먹는 것, 자주 가는 장소를 언제든 다시 다듬을 수 있어요.', renderProfileForm(state.profile, 'profile', '저장하기'));
        if (UI.modal.type === 'help') {
            const card = findHelpCard(UI.modal.cardId);
            if (!card) return '';
            const isPinned = state.session.pinnedHelpCardId === card.id;
            return wrapModal(card.title, card.scenario, `<div class="detail-list"><section class="detail-panel"><h4>지금 할 행동</h4><ol>${card.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol></section><section class="detail-panel"><h4>피하면 좋아요</h4><ul>${card.avoidTips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}</ul></section><section class="detail-panel"><h4>루나에게 이렇게 말해보세요</h4><p class="info-body">${escapeHtml(card.examplePhrase)}</p></section><div class="form-actions"><button class="primary-button" data-action="toggle-pin-help" data-card-id="${card.id}">${isPinned ? '오늘 고정 해제' : '오늘에 고정'}</button></div></div>`);
        }
        if (UI.modal.type === 'record-detail') {
            const log = findLog(UI.modal.logId);
            if (!log) return '';
            return wrapModal(`${log.typeLabel} · ${log.title}`, formatRecordMoment(log.createdAt), `<div class="detail-list"><section class="detail-panel"><h4>기록 내용</h4><p class="info-body">${escapeHtml(formatLogSummary(log))}</p></section>${log.note ? `<section class="detail-panel"><h4>메모</h4><p class="info-body">${escapeHtml(log.note)}</p></section>` : ''}<div class="form-actions"><button class="primary-button" data-action="edit-record" data-log-id="${log.id}">이 기록 수정</button><button class="secondary-button" data-action="delete-record" data-log-id="${log.id}">이 기록 삭제</button></div></div>`);
        }
        if (UI.modal.type === 'log-form') {
            const config = getLogFormConfig(UI.modal.logType, UI.modal.logId || null);
            return wrapModal(config.title, config.description, config.body);
        }
        return '';
    }

    function wrapModal(title, copy, body) {
        return `<div class="modal-layer" data-action="close-modal-overlay"><section class="modal-sheet" role="dialog" aria-modal="true"><div class="modal-header"><div><h2 class="modal-title">${escapeHtml(title)}</h2><p class="modal-copy">${escapeHtml(copy)}</p></div><button class="modal-close" type="button" aria-label="닫기" data-action="close-modal">×</button></div>${body}</section></div>`;
    }

    function renderProfileForm(profile, mode, submitLabel) {
        return `
            <form class="form-grid" data-form="profile" data-mode="${mode}">
                <section class="profile-photo-card">
                    <img class="profile-avatar large" src="${escapeHtml(profile.photoUrl || DEFAULT_PROFILE.photoUrl)}" alt="루나 프로필 사진" data-profile-photo-preview>
                    <div class="profile-photo-copy">
                        <p class="profile-name">${escapeHtml(profile.name)}</p>
                        <p class="profile-fixed">${escapeHtml(renderFixedProfileMeta(profile))}</p>
                        <p class="section-note">생년월일과 성별은 루나 기준으로 고정돼 있어요. 프로필 사진은 언제든 바꿀 수 있어요.</p>
                        <input type="hidden" name="photoUrl" value="${escapeHtml(profile.photoUrl || DEFAULT_PROFILE.photoUrl)}">
                        <input type="hidden" name="photoAction" value="keep">
                        <div class="profile-photo-actions">
                            <label class="upload-button">사진 바꾸기<input class="visually-hidden" type="file" name="photoFile" accept="image/*"></label>
                            <button class="secondary-button" type="button" data-action="reset-photo">기본 사진으로 되돌리기</button>
                        </div>
                    </div>
                </section>
                <section class="profile-static-card">
                    <span class="summary-label">고정 기본 정보</span>
                    <strong class="summary-value">${escapeHtml(renderFixedProfileMeta(profile))}</strong>
                    <p class="section-note">이 앱은 루나 한 명만을 위한 앱이라 이름, 생년월일, 성별은 따로 입력하지 않아요.</p>
                </section>
                <div class="form-split">
                    <label class="field-group"><span class="field-label">보통 기상 시간</span><input class="field" type="time" name="wakeTime" value="${escapeHtml(profile.wakeTime)}"></label>
                    <label class="field-group"><span class="field-label">보통 낮잠 시간</span><input class="field" type="time" name="napTime" value="${escapeHtml(profile.napTime)}"></label>
                </div>
                <label class="field-group"><span class="field-label">보통 취침 시간</span><input class="field" type="time" name="bedTime" value="${escapeHtml(profile.bedTime)}"></label>
                <label class="field-group"><span class="field-label">좋아하는 음식</span><input class="field" name="favoriteFoods" placeholder="예: 바나나, 두부, 미역국" value="${escapeHtml(profile.favoriteFoods.join(', '))}"></label>
                <label class="field-group"><span class="field-label">자주 거부하는 음식</span><input class="field" name="dislikedFoods" placeholder="예: 브로콜리, 당근" value="${escapeHtml(profile.dislikedFoods.join(', '))}"></label>
                <label class="field-group"><span class="field-label">자주 가는 외출 장소</span><input class="field" name="frequentPlaces" placeholder="예: 공원, 병원" value="${escapeHtml(profile.frequentPlaces.join(', '))}"></label>
                <div class="form-actions"><button class="primary-button" type="submit">${escapeHtml(submitLabel)}</button>${mode === 'profile' ? '<button class="secondary-button" type="button" data-action="close-modal">닫기</button>' : ''}</div>
            </form>
        `;
    }

    function getLogFormConfig(logType, logId) {
        const existingLog = logId ? findLog(logId) : null;
        const editing = Boolean(existingLog);
        const titleMap = { Meal: editing ? '식사 기록 수정' : '식사 기록', Nap: editing ? '낮잠 기록 수정' : '낮잠 기록', Diaper: editing ? '기저귀 기록 수정' : '기저귀 기록', Outing: editing ? '외출 기록 수정' : '외출 기록' };
        const descriptionMap = { Meal: '잘 먹음, 거부, 숟가락 사용 같은 식사 흐름을 바로 남겨요.', Nap: '낮잠 길이와 메모만 남겨도 하루 리듬을 보기 쉬워져요.', Diaper: '소변, 대변, 특이사항을 짧게 남겨요.', Outing: '외출 종류와 챙긴 것, 메모를 함께 남겨요.' };
        return { title: titleMap[logType], description: descriptionMap[logType], body: renderLogForm(logType, existingLog) };
    }

    function renderLogForm(logType, existingLog) {
        const editing = Boolean(existingLog);
        const commonHidden = `<input type="hidden" name="mode" value="${editing ? 'edit' : 'create'}"><input type="hidden" name="logType" value="${logType}">${editing ? `<input type="hidden" name="logId" value="${existingLog.id}">` : ''}`;
        if (logType === 'Meal') {
            const value = existingLog ? existingLog.payload : { kind: 'lunch', status: 'ateWell', tags: [], note: '' };
            return `<form class="form-grid" data-form="log">${commonHidden}<div class="field-group"><span class="field-label">식사 종류</span><div class="choice-wrap">${MEAL_KINDS.map((option) => renderChoice('meal-kind', option, value.kind, false)).join('')}</div></div><div class="field-group"><span class="field-label">오늘 상태</span><div class="choice-wrap">${MEAL_STATUSES.map((option) => renderChoice('meal-status', option, value.status, false)).join('')}</div></div><div class="field-group"><span class="field-label">메모 태그</span><div class="choice-wrap">${MEAL_TAGS.map((option) => renderChoice('meal-tags', option, value.tags, true)).join('')}</div></div><label class="field-group"><span class="field-label">한 줄 메모</span><textarea class="textarea" name="note" placeholder="예: 바나나와 두부는 잘 먹음">${escapeHtml(value.note || '')}</textarea></label><div class="form-actions"><button class="primary-button" type="submit">${editing ? '수정 저장' : '저장하기'}</button><button class="secondary-button" type="button" data-action="close-modal">닫기</button></div></form>`;
        }
        if (logType === 'Nap') {
            const value = existingLog ? existingLog.payload : { durationMinutes: 60, note: '' };
            return `<form class="form-grid" data-form="log">${commonHidden}<div class="field-group"><span class="field-label">낮잠 길이</span><div class="choice-wrap">${NAP_OPTIONS.map((minutes) => renderChoice('nap-duration-choice', { value: String(minutes), label: formatDuration(minutes) }, String(value.durationMinutes), false)).join('')}</div></div><label class="field-group"><span class="field-label">직접 분 단위 입력</span><input class="field" type="number" min="5" max="240" name="durationMinutes" value="${escapeHtml(String(value.durationMinutes || 60))}"></label><label class="field-group"><span class="field-label">메모</span><textarea class="textarea" name="note" placeholder="예: 평소보다 빨리 깸">${escapeHtml(value.note || '')}</textarea></label><div class="form-actions"><button class="primary-button" type="submit">${editing ? '수정 저장' : '저장하기'}</button><button class="secondary-button" type="button" data-action="close-modal">닫기</button></div></form>`;
        }
        if (logType === 'Diaper') {
            const value = existingLog ? existingLog.payload : { kind: 'wet', condition: 'none', note: '' };
            return `<form class="form-grid" data-form="log">${commonHidden}<div class="field-group"><span class="field-label">기록 종류</span><div class="choice-wrap">${DIAPER_KINDS.map((option) => renderChoice('diaper-kind', option, value.kind, false)).join('')}</div></div><div class="field-group"><span class="field-label">특이사항</span><div class="choice-wrap">${DIAPER_CONDITIONS.map((option) => renderChoice('diaper-condition', option, value.condition, false)).join('')}</div></div><label class="field-group"><span class="field-label">메모</span><textarea class="textarea" name="note" placeholder="선택 입력">${escapeHtml(value.note || '')}</textarea></label><div class="form-actions"><button class="primary-button" type="submit">${editing ? '수정 저장' : '저장하기'}</button><button class="secondary-button" type="button" data-action="close-modal">닫기</button></div></form>`;
        }
        const value = existingLog ? existingLog.payload : { kind: 'park', checklist: ['물', '간식', '기저귀'], note: '' };
        return `<form class="form-grid" data-form="log">${commonHidden}<div class="field-group"><span class="field-label">외출 종류</span><div class="choice-wrap">${OUTING_KINDS.map((option) => renderChoice('outing-kind', option, value.kind, false)).join('')}</div></div><div class="field-group"><span class="field-label">챙긴 것</span><div class="choice-wrap">${OUTING_CHECKLIST.map((item) => renderChoice('outing-checklist', { value: item, label: item }, value.checklist || [], true)).join('')}</div></div><label class="field-group"><span class="field-label">외출 메모</span><textarea class="textarea" name="note" placeholder="예: 병원 예약 3시">${escapeHtml(value.note || '')}</textarea></label><div class="form-actions"><button class="primary-button" type="submit">${editing ? '수정 저장' : '저장하기'}</button><button class="secondary-button" type="button" data-action="close-modal">닫기</button></div></form>`;
    }

    function renderChoice(name, option, currentValue, isMultiple) {
        const checked = isMultiple ? Array.isArray(currentValue) && currentValue.includes(option.value) : currentValue === option.value;
        return `<label class="choice-chip"><input type="${isMultiple ? 'checkbox' : 'radio'}" name="${name}" value="${escapeHtml(option.value)}" ${checked ? 'checked' : ''}><span>${escapeHtml(option.label)}</span></label>`;
    }

    function handleAppClick(event) {
        const target = event.target.closest('[data-action]');
        if (!target) return;
        const action = target.dataset.action;
        if (action === 'switch-tab') {
            UI.activeTab = target.dataset.tab;
            playUiSound('select');
            render();
            return;
        }
        if (action === 'open-profile') {
            UI.modal = { type: 'profile' };
            playUiSound('tap');
            render();
            return;
        }
        if (action === 'open-log-form') {
            UI.modal = { type: 'log-form', logType: target.dataset.logType, logId: null };
            playUiSound('tap');
            render();
            return;
        }
        if (action === 'open-help') {
            UI.modal = { type: 'help', cardId: target.dataset.cardId };
            playUiSound('tap');
            render();
            return;
        }
        if (action === 'open-record') {
            UI.modal = { type: 'record-detail', logId: target.dataset.logId };
            playUiSound('tap');
            render();
            return;
        }
        if (action === 'reset-photo') {
            resetProfilePhoto(target);
            playUiSound('select');
            return;
        }
        if (action === 'filter-help') {
            UI.helpCategory = target.dataset.category;
            playUiSound('select');
            render();
        }
    }

    function handleAppInput(event) {
        if (event.target.dataset.input === 'help-search') {
            UI.helpSearch = event.target.value;
            playTypingSound();
            render();
            return;
        }
        if (isTextEntryTarget(event.target)) playTypingSound();
    }

    async function handleFormChange(event) {
        const target = event.target;
        const tagName = String(target && target.tagName || '').toUpperCase();
        if (tagName === 'SELECT') {
            playUiSound('select');
            return;
        }
        if (tagName !== 'INPUT') return;
        const type = String(target.type || '').toLowerCase();
        if (target.name === 'photoFile') {
            const file = target.files && target.files[0];
            if (!file) return;
            const form = target.closest('form');
            if (!form) return;
            try {
                const nextUrl = await readFileAsDataUrl(file);
                const hidden = form.querySelector('input[name="photoUrl"]');
                const actionInput = form.querySelector('input[name="photoAction"]');
                const preview = form.querySelector('[data-profile-photo-preview]');
                if (hidden) hidden.value = nextUrl;
                if (actionInput) actionInput.value = 'custom';
                if (preview) preview.src = nextUrl;
                playUiSound('photo');
            } catch (error) {
                console.error(error);
            }
            return;
        }
        if (type === 'radio' || type === 'checkbox') playUiSound('select');
    }

    function handleModalClick(event) {
        const actionTarget = event.target.closest('[data-action]');
        if (!actionTarget) return;
        const action = actionTarget.dataset.action;
        if (action === 'close-modal') {
            UI.modal = null;
            playUiSound('close');
            render();
            return;
        }
        if (action === 'close-modal-overlay') {
            if (event.target === actionTarget) {
                UI.modal = null;
                playUiSound('close');
                render();
            }
            return;
        }
        if (action === 'reset-photo') {
            resetProfilePhoto(actionTarget);
            playUiSound('select');
            return;
        }
        if (action === 'toggle-pin-help') {
            const cardId = actionTarget.dataset.cardId;
            state.session.pinnedHelpCardId = state.session.pinnedHelpCardId === cardId ? null : cardId;
            UI.modal = null;
            playUiSound('select');
            commit();
            return;
        }
        if (action === 'edit-record') {
            const log = findLog(actionTarget.dataset.logId);
            if (!log) return;
            UI.modal = { type: 'log-form', logType: log.type, logId: log.id };
            playUiSound('tap');
            render();
            return;
        }
        if (action === 'delete-record') {
            const logId = actionTarget.dataset.logId;
            if (window.confirm('? ??? ?????? ???? ?? ??? ? ???.')) {
                state.logs = state.logs.filter((log) => log.id !== logId);
                UI.modal = null;
                playUiSound('delete');
                commit();
            }
        }
    }

    function handleModalSubmit(event) {
        event.preventDefault();
        const form = event.target;
        if (!(form instanceof HTMLFormElement)) return;
        if (form.dataset.form === 'profile') {
            state.profile = readProfileForm(form);
            if (form.dataset.mode === 'onboarding') state.session.hasCompletedOnboarding = true;
            UI.modal = null;
            playUiSound('success');
            commit();
            return;
        }
        if (form.dataset.form === 'log') {
            const nextLog = readLogForm(form);
            const existingIndex = state.logs.findIndex((log) => log.id === nextLog.id);
            if (existingIndex >= 0) state.logs[existingIndex] = nextLog; else state.logs.push(nextLog);
            state.logs = state.logs.map(normalizeLog).sort(sortLogsDesc);
            UI.modal = nextLog.type === 'Meal' && nextLog.status === '??' ? { type: 'help', cardId: 'meal_refusal' } : null;
            playUiSound('success');
            commit();
        }
    }

    function readProfileForm(form) {
        const data = new FormData(form);
        const photoAction = String(data.get('photoAction') || 'keep');
        const photoUrl = photoAction === 'default'
            ? DEFAULT_PROFILE.photoUrl
            : valueOrFallback(data.get('photoUrl'), DEFAULT_PROFILE.photoUrl);
        return {
            name: DEFAULT_PROFILE.name,
            gender: DEFAULT_PROFILE.gender,
            genderLabel: DEFAULT_PROFILE.genderLabel,
            birthDate: DEFAULT_PROFILE.birthDate,
            photoUrl,
            wakeTime: valueOrFallback(data.get('wakeTime'), DEFAULT_PROFILE.wakeTime),
            napTime: valueOrFallback(data.get('napTime'), DEFAULT_PROFILE.napTime),
            bedTime: valueOrFallback(data.get('bedTime'), DEFAULT_PROFILE.bedTime),
            favoriteFoods: parseCsvList(data.get('favoriteFoods'), DEFAULT_PROFILE.favoriteFoods),
            dislikedFoods: parseCsvList(data.get('dislikedFoods'), DEFAULT_PROFILE.dislikedFoods),
            frequentPlaces: parseCsvList(data.get('frequentPlaces'), DEFAULT_PROFILE.frequentPlaces),
        };
    }

    function resetProfilePhoto(target) {
        const form = target.closest('form');
        if (!form) return;
        const hidden = form.querySelector('input[name="photoUrl"]');
        const actionInput = form.querySelector('input[name="photoAction"]');
        const preview = form.querySelector('[data-profile-photo-preview]');
        const fileInput = form.querySelector('input[name="photoFile"]');
        if (hidden) hidden.value = DEFAULT_PROFILE.photoUrl;
        if (actionInput) actionInput.value = 'default';
        if (preview) preview.src = DEFAULT_PROFILE.photoUrl;
        if (fileInput) fileInput.value = '';
    }

    function readFileAsDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || DEFAULT_PROFILE.photoUrl));
            reader.onerror = () => reject(reader.error || new Error('photo-read-failed'));
            reader.readAsDataURL(file);
        });
    }

    function formatBirthDateLong(birthDateText) {
        const [year, month, day] = String(birthDateText).split('-').map((value) => Number(value || 0));
        return `${year}년 ${month}월 ${day}일`;
    }

    function readLogForm(form) {
        const data = new FormData(form);
        const mode = String(data.get('mode'));
        const type = String(data.get('logType'));
        const existingLog = mode === 'edit' ? findLog(String(data.get('logId'))) : null;
        const createdAt = existingLog ? existingLog.createdAt : new Date().toISOString();
        const id = existingLog ? existingLog.id : generateId(type.toLowerCase());
        if (type === 'Meal') return buildMealLogFromForm(data, id, createdAt);
        if (type === 'Nap') return buildNapLogFromForm(data, id, createdAt);
        if (type === 'Diaper') return buildDiaperLogFromForm(data, id, createdAt);
        return buildOutingLogFromForm(data, id, createdAt);
    }

    function buildMealLogFromForm(data, id, createdAt) {
        const kind = String(data.get('meal-kind') || 'lunch');
        const status = String(data.get('meal-status') || 'ateWell');
        const tags = data.getAll('meal-tags').map(String);
        const note = String(data.get('note') || '').trim();
        const kindOption = findOption(MEAL_KINDS, kind);
        const statusOption = findOption(MEAL_STATUSES, status);
        return normalizeLog({ id, type: 'Meal', typeLabel: '식사', title: kindOption.label, detail: buildMealDetail(tags, note), createdAt, status: statusOption.label, durationMinutes: null, note: note || null, payload: { kind, status, tags, note } });
    }

    function buildNapLogFromForm(data, id, createdAt) {
        const rawDuration = Number(data.get('durationMinutes'));
        const durationMinutes = Number.isFinite(rawDuration) ? Math.max(5, rawDuration) : 60;
        const note = String(data.get('note') || '').trim();
        return normalizeLog({ id, type: 'Nap', typeLabel: '낮잠', title: '낮잠', detail: formatDuration(durationMinutes), createdAt, status: null, durationMinutes, note: note || null, payload: { durationMinutes, note } });
    }

    function buildDiaperLogFromForm(data, id, createdAt) {
        const kind = String(data.get('diaper-kind') || 'wet');
        const condition = String(data.get('diaper-condition') || 'none');
        const note = String(data.get('note') || '').trim();
        const kindOption = findOption(DIAPER_KINDS, kind);
        const conditionOption = findOption(DIAPER_CONDITIONS, condition);
        return normalizeLog({ id, type: 'Diaper', typeLabel: '기저귀', title: kindOption.label, detail: [kindOption.label, conditionOption.label].join(' · '), createdAt, status: null, durationMinutes: null, note: note || null, payload: { kind, condition, note } });
    }

    function buildOutingLogFromForm(data, id, createdAt) {
        const kind = String(data.get('outing-kind') || 'park');
        const checklist = data.getAll('outing-checklist').map(String);
        const note = String(data.get('note') || '').trim();
        const kindOption = findOption(OUTING_KINDS, kind);
        return normalizeLog({ id, type: 'Outing', typeLabel: '외출', title: kindOption.label, detail: [kindOption.label, checklist.join(', ')].filter(Boolean).join(' · '), createdAt, status: null, durationMinutes: null, note: note || null, payload: { kind, checklist, note } });
    }

    function deriveTodayState() {
        const todayLogs = state.logs.filter((log) => dateKey(log.createdAt) === dateKey(new Date().toISOString()));
        const lastMeal = todayLogs.find((log) => log.type === 'Meal') || null;
        const lastNap = todayLogs.find((log) => log.type === 'Nap') || null;
        const outingCount = todayLogs.filter((log) => log.type === 'Outing').length;
        const lastNote = todayLogs.find((log) => log.note)?.note || '오늘 메모가 아직 없어요';
        const recentWeekLogs = getRecentWeekLogs();
        const lunchRefusalCount = recentWeekLogs.filter((log) => log.type === 'Meal' && log.title === '점심' && log.status === '거부').length;
        const pinnedHelp = findHelpCard(state.session.pinnedHelpCardId);
        let headline = '루나의 오늘이 차분하게 이어지고 있어요.';
        if (!lastMeal) headline = '첫 식사를 기록하면 루나의 하루 흐름이 더 선명해져요.';
        else if (!lastNap) headline = '점심 전이에요. 낮잠 전 식사 리듬을 가볍게 챙겨보세요.';
        else if (outingCount === 0) headline = '오후 외출 전이에요. 물과 간식을 챙기면 훨씬 편해져요.';
        let nextAction = { title: '집에서 5분 놀이 해보기', body: '짧은 놀이 한 번이면 루나의 집중도와 기분이 모두 달라질 수 있어요.', helpCardId: 'play_five_minutes', ctaLabel: '놀이 카드 보기' };
        if (pinnedHelp) nextAction = { title: pinnedHelp.title, body: '오늘에 고정한 도움 카드예요. 필요할 때 바로 꺼내볼 수 있어요.', helpCardId: pinnedHelp.id, ctaLabel: '고정한 도움 보기' };
        else if (lunchRefusalCount >= 2) nextAction = { title: '점심 분위기 편하게 가져가기', body: `최근 7일 동안 점심 거부가 ${lunchRefusalCount}회 있었어요. 양보다 리듬을 우선해보세요.`, helpCardId: 'meal_refusal', ctaLabel: '관련 도움 보기' };
        else if (lastNap && lastNap.durationMinutes && lastNap.durationMinutes < 60) nextAction = { title: '저녁 루틴 15분 앞당기기', body: '낮잠이 짧은 날은 저녁 피로가 빨리 올라와요. 목욕과 취침 준비를 조금 서둘러보세요.', helpCardId: 'play_energy', ctaLabel: '관련 도움 보기' };
        else if (outingCount === 0) nextAction = { title: '오후 외출 준비하기', body: '자주 쓰는 체크리스트만 확인해도 외출 준비가 훨씬 가벼워져요.', helpCardId: 'outing_prepare', ctaLabel: '관련 도움 보기' };
        return {
            headline,
            ageLabel: `현재 ${getAgeInMonths(state.profile.birthDate)}개월`,
            nextAction,
            quickHelpCards: buildQuickHelpCards(),
            summaryRows: [
                { label: '마지막 식사', value: lastMeal ? `${formatClockFromTimestamp(lastMeal.createdAt)} ${lastMeal.title} · ${lastMeal.status || lastMeal.detail}` : '아직 없음' },
                { label: '마지막 낮잠', value: lastNap ? `${formatClockFromTimestamp(lastNap.createdAt)} ${formatDuration(lastNap.durationMinutes || 0)}` : '아직 없음' },
                { label: '외출', value: `오늘 ${outingCount}회` },
                { label: '메모', value: lastNote },
            ],
        };
    }

    function deriveRecordsState() {
        const recentWeekLogs = getRecentWeekLogs();
        const napDurations = recentWeekLogs.map((log) => log.durationMinutes).filter((value) => typeof value === 'number' && value > 0);
        return {
            timeline: state.logs.slice(0, 20),
            summary: {
                lunchRefusalCount: recentWeekLogs.filter((log) => log.type === 'Meal' && log.title === '점심' && log.status === '거부').length,
                averageNapMinutes: napDurations.length ? Math.round(napDurations.reduce((total, value) => total + value, 0) / napDurations.length) : 0,
                outingCount: recentWeekLogs.filter((log) => log.type === 'Outing').length,
            },
            frequentHelpTitles: buildFrequentHelpTitles(recentWeekLogs),
        };
    }

    function buildQuickHelpCards() {
        const pinned = findHelpCard(state.session.pinnedHelpCardId);
        const cards = [];
        if (pinned) cards.push(pinned);
        QUICK_HELP_IDS.forEach((cardId) => {
            const card = findHelpCard(cardId);
            if (card && card.id !== state.session.pinnedHelpCardId) cards.push(card);
        });
        return cards.slice(0, 4);
    }

    function buildFrequentHelpTitles(recentWeekLogs) {
        const titles = [];
        if (recentWeekLogs.some((log) => log.type === 'Meal' && log.status === '거부')) titles.push('밥 안 먹어요');
        if (recentWeekLogs.some((log) => log.type === 'Outing')) titles.push('외출 준비');
        if (recentWeekLogs.some((log) => log.type === 'Nap' && (log.durationMinutes || 0) < 60)) titles.push('에너지 빼는 놀이');
        return titles.length > 0 ? titles : ['집에서 5분 놀이', '떼써요'];
    }

    function getFilteredHelpCards() {
        const query = UI.helpSearch.trim().toLowerCase();
        return HELP_CARDS.filter((card) => {
            const categoryMatch = UI.helpCategory === 'all' || card.category === UI.helpCategory;
            const queryMatch = !query || [card.title, card.scenario, card.examplePhrase].concat(card.steps).concat(card.avoidTips).some((value) => value.toLowerCase().includes(query));
            return categoryMatch && queryMatch;
        });
    }

    function getRecentWeekLogs() {
        const limit = new Date();
        limit.setDate(limit.getDate() - 6);
        return state.logs.filter((log) => new Date(log.createdAt) >= limit);
    }

    function createInitialLogs() {
        return [
            createSeedMeal('meal_breakfast_today', 0, 9, 10, 'breakfast', 'ateWell', ['liked'], '아침엔 컨디션 좋음'),
            createSeedDiaper('diaper_today', 0, 11, 40, 'wet', 'none', ''),
            createSeedOuting('outing_yesterday', 1, 15, 20, 'park', ['물', '간식', '기저귀'], ''),
            createSeedMeal('meal_lunch_refusal_week1', 2, 12, 15, 'lunch', 'refused', ['resisted'], ''),
            createSeedNap('nap_week1', 2, 13, 50, 65, '평소보다 빨리 깸'),
            createSeedMeal('meal_lunch_half_week2', 4, 12, 10, 'lunch', 'ateHalf', [], ''),
            createSeedMeal('meal_lunch_refusal_week3', 6, 12, 25, 'lunch', 'refused', ['resisted'], ''),
        ].sort(sortLogsDesc);
    }

    function createSeedMeal(id, daysAgo, hour, minute, kind, status, tags, note) {
        return normalizeLog({ id, type: 'Meal', typeLabel: '식사', title: findOption(MEAL_KINDS, kind).label, detail: buildMealDetail(tags, note), createdAt: buildRelativeTimestamp(daysAgo, hour, minute), status: findOption(MEAL_STATUSES, status).label, durationMinutes: null, note: note || null, payload: { kind, status, tags, note } });
    }

    function createSeedNap(id, daysAgo, hour, minute, durationMinutes, note) {
        return normalizeLog({ id, type: 'Nap', typeLabel: '낮잠', title: '낮잠', detail: formatDuration(durationMinutes), createdAt: buildRelativeTimestamp(daysAgo, hour, minute), status: null, durationMinutes, note: note || null, payload: { durationMinutes, note } });
    }

    function createSeedDiaper(id, daysAgo, hour, minute, kind, condition, note) {
        return normalizeLog({ id, type: 'Diaper', typeLabel: '기저귀', title: findOption(DIAPER_KINDS, kind).label, detail: `${findOption(DIAPER_KINDS, kind).label} · ${findOption(DIAPER_CONDITIONS, condition).label}`, createdAt: buildRelativeTimestamp(daysAgo, hour, minute), status: null, durationMinutes: null, note: note || null, payload: { kind, condition, note } });
    }

    function createSeedOuting(id, daysAgo, hour, minute, kind, checklist, note) {
        return normalizeLog({ id, type: 'Outing', typeLabel: '외출', title: findOption(OUTING_KINDS, kind).label, detail: `${findOption(OUTING_KINDS, kind).label} · ${checklist.join(', ')}`, createdAt: buildRelativeTimestamp(daysAgo, hour, minute), status: null, durationMinutes: null, note: note || null, payload: { kind, checklist, note } });
    }

    function buildRelativeTimestamp(daysAgo, hour, minute) {
        const date = new Date();
        date.setHours(hour, minute, 0, 0);
        date.setDate(date.getDate() - daysAgo);
        return date.toISOString();
    }

    function findHelpCard(cardId) { return HELP_CARDS.find((card) => card.id === cardId) || null; }
    function findLog(logId) { return state.logs.find((log) => log.id === logId) || null; }
    function findOption(options, value) { return options.find((option) => option.value === value) || options[0]; }
    function normalizeList(value, fallback) { const filtered = Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean) : []; return filtered.length > 0 ? filtered : fallback; }
    function parseCsvList(value, fallback) { const parsed = String(value || '').split(',').map((item) => item.trim()).filter(Boolean); return parsed.length > 0 ? parsed : fallback; }
    function valueOrFallback(value, fallback) { const text = String(value || '').trim(); return text || fallback; }
    function escapeHtml(value) { return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;'); }
    function sortLogsDesc(left, right) { return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(); }
    function generateId(prefix) { return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`; }
    function dateKey(isoString) { return new Date(isoString).toDateString(); }
    function getAgeInMonths(birthDateText) {
        const birth = new Date(`${birthDateText}T00:00:00`);
        const now = new Date();
        let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
        if (now.getDate() < birth.getDate()) months -= 1;
        return Math.max(0, months);
    }
    function toKoreanTime(hour, minute) { const period = hour < 12 ? '오전' : '오후'; const normalized = hour % 12 === 0 ? 12 : hour % 12; return `${period} ${String(normalized).padStart(2, '0')}:${String(minute).padStart(2, '0')}`; }
    function formatClock(date) { return toKoreanTime(date.getHours(), date.getMinutes()); }
    function formatClockLabel(value) { const [hourText, minuteText] = String(value).split(':'); return toKoreanTime(Number(hourText || 0), Number(minuteText || 0)); }
    function formatClockFromTimestamp(isoString) { return formatClock(new Date(isoString)); }
    function formatRecordMoment(isoString) { const date = new Date(isoString); const prefix = date.toDateString() === new Date().toDateString() ? '오늘' : `${date.getMonth() + 1}월 ${date.getDate()}일`; return `${prefix} ${formatClock(date)}`; }
    function formatDuration(minutes) { if (!minutes || minutes <= 0) return '0분'; const hours = Math.floor(minutes / 60); const remain = minutes % 60; if (hours > 0 && remain > 0) return `${hours}시간 ${remain}분`; if (hours > 0) return `${hours}시간`; return `${remain}분`; }
    function parseDurationMinutes(detail) { const hourMatch = /(\d+)시간/.exec(detail || ''); const minuteMatch = /(\d+)분/.exec(detail || ''); return (hourMatch ? Number(hourMatch[1]) : 0) * 60 + (minuteMatch ? Number(minuteMatch[1]) : 0); }
    function buildMealDetail(tags, note) { const labels = tags.map((tag) => findOption(MEAL_TAGS, tag).label); return labels.concat(note ? [note] : []).join(' · ') || '루나 식사 기록'; }
    function formatLogSummary(log) { return log.status ? `${log.status} · ${log.detail}` : log.detail; }

})();