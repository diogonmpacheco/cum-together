(function () {
  "use strict";

  const STORAGE_KEY = "come-together-language";
  const SUPPORTED_LOCALES = new Set(["en", "pt-PT"]);
  const TRANSLATED_ATTRIBUTES = ["aria-label", "title", "placeholder", "alt"];
  const textState = new WeakMap();
  const attributeState = new WeakMap();

  const explicitEnglish = Object.freeze({
    "Private rooms for adult presence": "Private video rooms for mutual masturbation",
    "Closed alpha. Seen, not ranked.": "Closed alpha. Mutual masturbation, without rankings.",
    "A closed-alpha, no-face, silent video room for adults who want shared presence without feeds, rankings, DMs, tips, followers, or public exposure.":
      "A sex-positive, closed-alpha, no-face, silent video room where consenting adults can masturbate together—without feeds, rankings, DMs, tips, followers, or public exposure.",
    "Closed alpha, adults only, no-face by default, silent throughout.":
      "Closed alpha for adults to masturbate together. No-face by default and silent throughout.",
    "Most adult video spaces turn people into inventory: browsed, ranked, messaged, tipped, saved, and skipped. This project starts from the opposite idea: a room where people can belong without becoming products.":
      "Masturbation is normal, and talking about it should be normal too. Cum Together is a sex-positive room where adults can masturbate together without being browsed, ranked, messaged, tipped, saved, or skipped.",
    "A group space, not a feed.": "Masturbation together, not a feed.",
    "Equal windows, no faces by default, room-wide pulses only. Bodies can be present without turning into a popularity contest.":
      "Equal windows, no faces by default, and room-wide pulses only. Adults can masturbate together without turning anyone into a popularity contest.",
    "No microphones, music, chat, DMs, comments, or pressure to perform.":
      "No microphones, music, chat, DMs, or pressure to masturbate, stay visible, or perform for anyone.",
    "A no-face, silent adult room for shared presence.":
      "A no-face, silent room where consenting adults can masturbate together.",
    "Adult consent": "Adults and sexual content",
    "18+, consenting adults only. No minors nearby or able to enter frame.":
      "I am 18 or older and consent to enter a room where adults may be nude and masturbating. No minors are present or able to enter the frame.",
    "I will pause, hide, or leave when someone needs space.":
      "Masturbation and visibility are always optional. Anyone can pause, hide, or leave at any time.",
    "Enter the next available room. No room list, no thumbnails, no gender or anatomy sorting, and no skip feed.":
      "Join the next available room to masturbate together. No room list, thumbnails, gender or anatomy sorting, or skip feed.",
    "Viewer entry joins without camera and rolls up into a quiet viewer count instead of another empty tile.":
      "Viewer mode lets you watch adults masturbate without being on camera yourself. It stays silent and appears as a viewer count instead of an empty tile.",
    "Viewer entry stays silent and camera-free. It shows up as a quiet viewer count instead of another inactive tile, and hosts can still limit or close it.":
      "Viewer mode lets you watch adults masturbate without being on camera yourself. It stays silent, appears as a viewer count, and hosts can limit or close it."
  });

  const portuguese = Object.freeze({
    "Cum Together": "Cum Together",

    // First visit and project description
    "Private rooms for adult presence": "Salas de vídeo privadas para masturbação em conjunto",
    "Closed alpha. Seen, not ranked.": "Alfa fechada. Masturbação em conjunto, sem rankings.",
    "A closed-alpha, no-face, silent video room for adults who want shared presence without feeds, rankings, DMs, tips, followers, or public exposure.":
      "Um espaço positivo e aberto sobre a sexualidade, em alfa fechada e exclusivo para maiores de 18 anos, com salas de vídeo sem som e sem mostrar o rosto onde podem masturbar-se em conjunto — sem feeds, rankings, mensagens privadas, gorjetas, seguidores ou exposição pública.",
    "Start room check": "Verificar antes de entrar",
    "Adults only. No-face by default. Browsers cannot fully stop recording.":
      "Apenas maiores de 18 anos. Sem mostrar o rosto por defeito. Nenhum navegador consegue impedir totalmente gravações.",
    "First minute": "Primeiro minuto",
    "Understand the room": "Perceber como funciona a sala",
    "Closed alpha, adults only, no-face by default, silent throughout.":
      "Alfa fechada para maiores de 18 anos se masturbarem em conjunto, sem mostrar o rosto por defeito e sempre sem som.",
    "Agree to the boundaries": "Aceitar os limites",
    "Consent first. No minors, no contact exchange, and no recording.":
      "O consentimento vem primeiro. Sem menores, partilha de contactos ou gravações.",
    "Check your setup": "Verificar a configuração",
    "Preview your framing, enter paused if you want time, and leave at any moment.":
      "Confirma o enquadramento, entra em pausa se precisares de tempo e sai a qualquer momento.",
    "Project goal": "Objetivo do projeto",
    "Why this exists": "Porque existe",
    "Most adult video spaces turn people into inventory: browsed, ranked, messaged, tipped, saved, and skipped. This project starts from the opposite idea: a room where people can belong without becoming products.":
      "A masturbação é normal e falar sobre ela também devia ser. O Cum Together é um espaço positivo e aberto sobre a sexualidade onde pessoas adultas podem masturbar-se em conjunto sem serem escolhidas, classificadas, contactadas, remuneradas, guardadas ou descartadas como produtos.",
    "Before any room": "Antes de entrar numa sala",
    "You will see the room promise first, agree to the boundaries, and check your framing before joining. The first minute should feel calm, legible, and easy to leave.":
      "Vais ver primeiro o compromisso da sala, aceitar os limites e verificar o enquadramento antes de entrares. O primeiro minuto deve ser tranquilo, claro e facilitar a saída a qualquer momento.",
    "Project principles": "Princípios do projeto",
    "No-face by default": "Sem mostrar o rosto por defeito",
    "Identity is protected from the first room. Face rooms can be separate later.":
      "A identidade fica protegida desde a primeira sala. Mais tarde, poderão existir salas separadas onde mostrar o rosto seja uma escolha explícita.",
    "Silent and calm": "Silencioso e tranquilo",
    "No microphones, music, chat, DMs, comments, or pressure to perform.":
      "Sem microfones, música, chat ou mensagens privadas — e sem pressão para te masturbares, permaneceres visível ou atuares para alguém.",
    "Seen equally": "Presença em igualdade",
    "Equal tiles replace rankings, tips, follower counts, and appearance-driven popularity contests.":
      "Janelas com o mesmo destaque substituem rankings, gorjetas, contagens de seguidores e concursos de popularidade baseados na aparência.",
    "Safety first": "Segurança primeiro",
    "Adults only, consent before entry, no contact exchange, and quick pause controls.":
      "Apenas maiores de 18 anos, consentimento antes da entrada, sem partilha de contactos e com controlos rápidos para pausar.",

    // Preview room
    "Room preview": "Pré-visualização da sala",
    "Sample room preview, not live": "Pré-visualização de exemplo — não está em direto",
    "A group space, not a feed.": "Masturbação em conjunto, não um feed.",
    "Equal windows, no faces by default, room-wide pulses only. Bodies can be present without turning into a popularity contest.":
      "Janelas com o mesmo destaque, rostos ocultos por defeito e apenas reações para toda a sala. Aqui, as pessoas podem masturbar-se em conjunto sem transformar os corpos numa competição de popularidade.",
    "Preview principles": "Princípios da pré-visualização",
    "Preview reactions": "Reações de pré-visualização",
    "Placeholder camera windows": "Janelas de câmara de exemplo",
    "20 windows": "20 janelas",
    "no faces": "rostos ocultos",
    "silent": "sem som",
    "no rankings": "sem rankings",
    "Pulse": "Reação",
    "Heart": "Coração",
    "Warmth": "Calor",
    "Spark": "Faísca",
    "Visible": "Com câmara",
    "No-face": "Rosto oculto",
    "Seen": "Mesmo destaque",
    "Paused": "Em pausa",
    "Viewer": "Observador",
    "Removed": "Fora da sala",
    "Held": "Consentimento",
    "present": "presente",
    "hidden": "oculto",
    "watching": "a observar",
    "out": "fora",

    // Navigation and lobby
    "Room type": "Tipo de sala",
    "Community Room": "Sala da Comunidade",
    "How it works": "Como funciona",
    "consent first": "consentimento primeiro",
    "no faces": "rostos ocultos",
    "equal tiles": "janelas iguais",
    "silent only": "apenas sem som",
    "no chasing": "sem perseguição",
    "no built-in recording": "sem gravação integrada",
    "Closed alpha entry": "Entrada na alfa fechada",
    "Privacy status": "Estado da privacidade",
    "P2P-first": "P2P sempre que possível",
    "no-face default": "rosto oculto por defeito",
    "adults only": "apenas maiores de 18 anos",
    "no contact exchange": "sem partilha de contactos",
    "Room promise": "Compromisso da sala",
    "A no-face, silent adult room for shared presence.":
      "Uma sala sem som e sem mostrar o rosto onde pessoas adultas podem, com consentimento mútuo, masturbar-se em conjunto.",
    "Room principles": "Princípios da sala",
    "identity protected": "identidade protegida",
    "equal tiles, no ranking": "janelas iguais, sem rankings",
    "no voice, no music": "sem voz nem música",
    "consent before entry": "consentimento antes de entrar",
    "Join room": "Entrar na sala",
    "You": "Tu",
    "Name": "Nome na sala",
    "How you want to appear": "Como queres aparecer",
    "Names cannot include handles, links, @ symbols, numbers, or contact clues.":
      "Os nomes não podem incluir nomes de utilizador, links, símbolos @, números ou pistas de contacto.",
    "Short room names only. No handles, links, phone numbers, or contact clues.":
      "Usa apenas um nome curto. Sem nomes de utilizador, links, números de telefone ou pistas de contacto.",
    "No-face silent room": "Sala sem som e sem mostrar o rosto",
    "No face, no mic, no voice, no music. Local blur covers detected faces when supported.":
      "Sem rosto, microfone, voz ou música. Quando suportada, a desfocagem local cobre os rostos detetados.",
    "Closed alpha access ready": "Acesso à alfa confirmado",
    "Closed alpha access required": "É necessário acesso à alfa",
    "This invite link carries the room access token for this alpha session.":
      "Este link de convite inclui o token de acesso à sala para esta sessão alfa.",
    "This invite is incomplete. Use the full room link with its access token.":
      "Este convite está incompleto. Usa o link completo da sala, com o token de acesso.",
    "The shared alpha room is intentionally gated. Use the current access phrase for test sessions.":
      "O acesso à sala alfa partilhada é limitado de propósito. Usa a frase de acesso atual nas sessões de teste.",
    "Camera": "Câmara",
    "Front camera": "Câmara frontal",
    "Back camera": "Câmara traseira",
    "Room setup": "Configuração da sala",
    "Community room entry": "Entrada na sala da comunidade",
    "Private link room": "Sala privada por convite",
    "Enter the next available room. No room list, no thumbnails, no gender or anatomy sorting, and no skip feed.":
      "Entra na próxima sala disponível para te masturbares em conjunto. Sem lista de salas, miniaturas, filtros por género ou anatomia, nem feed para saltar entre pessoas.",
    "Unlisted room for people with the invite. The same room boundaries still apply.":
      "Sala não listada para quem recebeu o convite. Aplicam-se os mesmos limites.",
    "Community room activity": "Atividade da sala da comunidade",
    "rooms active": "salas ativas",
    "varied adult bodies": "corpos adultos diversos",
    "Back in queue. Next room opens in": "Voltaste à fila. A próxima sala abre dentro de",
    "Return to Community Room": "Voltar à Sala da Comunidade",
    "Alpha access phrase": "Frase de acesso à alfa",
    "Alpha phrase accepted for this browser.": "Frase alfa aceite neste navegador.",
    "Public alpha entry is locked until the current access phrase is entered.":
      "A entrada na alfa pública fica bloqueada até introduzires a frase de acesso atual.",
    "Join mode": "Modo de entrada",
    "Visible entry opens with your protected stream live after setup.":
      "Depois da configuração, a entrada com câmara inicia o teu vídeo protegido.",
    "Paused entry joins hidden first so you can assess the room before showing up.":
      "A entrada em pausa mantém a imagem oculta enquanto avalias a sala.",
    "Viewer entry joins without camera and rolls up into a quiet viewer count instead of another empty tile.":
      "O modo de observador permite ver pessoas adultas a masturbarem-se sem apareceres na câmara. Mantém-se sem som e surge na contagem de observadores, em vez de ocupar uma janela vazia.",

    // Agreement and boundaries
    "Room agreement": "Acordo da sala",
    "Three confirmations replace the long checklist. Details stay one tap away.":
      "Três confirmações substituem a lista longa. Os detalhes ficam a um toque.",
    "Adult consent": "Maioridade e conteúdo sexual",
    "18+, consenting adults only. No minors nearby or able to enter frame.":
      "Tenho 18 anos ou mais e aceito entrar numa sala onde podem estar pessoas nuas e a masturbarem-se. Não há menores presentes nem capazes de entrar no enquadramento.",
    "Privacy boundary": "Limites de privacidade",
    "No face, contact details, recording, screenshots, streaming, or sharing.":
      "Não mostrar o rosto nem contactos; não gravar, fazer capturas de ecrã, transmitir em direto ou partilhar.",
    "Room control": "Controlo pessoal",
    "I will pause, hide, or leave when someone needs space.":
      "A masturbação e a visibilidade são sempre opcionais. Qualquer pessoa pode pausar, ocultar-se ou sair a qualquer momento.",
    "Visible entry is blocked while multiple faces are detected.":
      "A entrada com câmara fica bloqueada enquanto forem detetados vários rostos.",
    "Boundaries and privacy": "Limites e privacidade",
    "no public room list, thumbnails, or skip feed":
      "sem lista pública de salas, miniaturas ou feed para saltar entre pessoas",
    "no gender, orientation, or anatomy category in the lobby":
      "sem categorias de género, orientação ou anatomia no ecrã de entrada",
    "alpha uses a same-browser bridge, with manual P2P fallback for dev":
      "a alfa usa uma ligação entre separadores do mesmo navegador, com P2P manual como alternativa para desenvolvimento",
    "browsers cannot fully block screenshots or screen recording":
      "nenhum navegador consegue impedir totalmente capturas ou gravações do ecrã",
    "No faces by default. Local face blur covers detected faces where supported.":
      "Por defeito, não se mostram rostos. Quando suportada, a desfocagem local cobre os rostos detetados.",
    "No chat, DMs, voice, music, tips, likes, rankings, or follower mechanics.":
      "Sem chat, mensagens privadas, voz, música, gorjetas, gostos, rankings ou mecanismos de seguidores.",
    "No names, handles, numbers, emails, links, QR codes, or off-platform contact exchange.":
      "Sem nomes, nomes de utilizador, números, e-mails, links, códigos QR ou partilha de contactos fora da plataforma.",
    "No minors, no coercion, no recording, no screenshots, no streaming, no sharing.":
      "Sem menores, coação, gravações, capturas de ecrã, transmissões em direto ou partilhas.",
    "Pause or leave immediately when something feels wrong.":
      "Pausa ou sai imediatamente se algo não parecer seguro ou se o consentimento mudar.",
    "Private invite": "Convite privado",
    "Create an unlisted room only when you want a specific invite, not a browsable public channel.":
      "Cria uma sala não listada apenas quando quiseres convidar pessoas específicas, não um canal público acessível por pesquisa.",
    "Create private link": "Criar link privado",
    "Copy invite": "Copiar convite",
    "Enter next room": "Entrar na próxima sala",
    "Continue to viewer entry": "Continuar como observador",
    "Continue to camera setup": "Continuar para configurar a câmara",
    "Complete the access phrase, name, and room agreement before entering.":
      "Preenche a frase de acesso, o nome e o acordo da sala antes de entrares.",

    // Camera setup and privacy states
    "No-face camera setup": "Configuração da câmara sem mostrar o rosto",
    "Back to agreement": "Voltar ao acordo",
    "closed alpha": "alfa fechada",
    "host desk": "painel do anfitrião",
    "guest join": "entrada de convidado",
    "no-face setup": "configuração com rosto oculto",
    "manual framing": "enquadramento manual",
    "Camera setup is off": "A configuração da câmara está desligada",
    "Framing guidance": "Orientações de enquadramento",
    "Before": "Antes de entrar em",
    "Viewer entry stays off-camera.": "A entrada como observador mantém a câmara desligada.",
    "No face expected.": "Não é preciso mostrar o rosto.",
    "Viewer entry stays silent and camera-free. It shows up as a quiet viewer count instead of another inactive tile, and hosts can still limit or close it.":
      "O modo de observador permite ver pessoas adultas a masturbarem-se sem apareceres na câmara. Mantém-se sem som, surge na contagem de observadores e pode ser limitado ou desativado pelo anfitrião.",
    "This step is here so people do not feel pressure to show identity. Frame below the neck, remove mirrors and screens, and enter paused if you want time before being visible.":
      "Este passo existe para que ninguém sinta pressão para mostrar a identidade. Enquadra a imagem abaixo do pescoço, retira espelhos e ecrãs e entra em pausa se quiseres algum tempo antes de ficar visível.",
    "Entry mode": "Modo de entrada",
    "Setup entry mode": "Modo de entrada na configuração",
    "Face out of frame": "Rosto fora do enquadramento",
    "No names, handles, links, or QR codes visible":
      "Sem nomes, nomes de utilizador, links ou códigos QR visíveis",
    "No minors nearby or able to enter frame":
      "Nenhuma pessoa menor por perto ou capaz de entrar no enquadramento",
    "Microphone is never requested": "O acesso ao microfone nunca é pedido",
    "Detected faces are blurred before room video":
      "Os rostos detetados são desfocados antes de o vídeo entrar na sala",
    "Use manual framing on this browser": "Usa o enquadramento manual neste navegador",
    "More than one face is detected. Visible entry stays blocked.":
      "Foi detetado mais de um rosto. A entrada com câmara permanece bloqueada.",
    "Enter visible": "Entrar com câmara",
    "Enter paused": "Entrar em pausa",
    "Enter as viewer": "Entrar como observador",
    "Protected delay": "Proteção temporária",
    "Protected delay active": "Proteção temporária ativa",
    "Face blur ready": "Desfocagem do rosto pronta",
    "Preparing protected delay": "A preparar a proteção",
    "Preparing privacy check": "A preparar a verificação de privacidade",
    "Multiple faces hidden": "Vários rostos ocultos",
    "Manual framing": "Enquadramento manual",
    "Camera warming": "A preparar a câmara",
    "Camera preview is off": "A pré-visualização da câmara está desligada",
    "Camera is not available.": "A câmara não está disponível.",

    // Live room, host and safety controls
    "Community alpha room": "Sala alfa da comunidade",
    "Invite-link room": "Sala por convite",
    "equal view": "mesmo destaque",
    "no-face": "rosto oculto",
    "no recording tool": "sem ferramenta de gravação",
    "20-seat room": "Sala com 20 lugares",
    "Room": "Sala",
    "equal windows": "janelas iguais",
    "no featured tile": "nenhuma janela em destaque",
    "Room reactions": "Reações da sala",
    "Video room": "Sala de vídeo",
    "viewer": "observador",
    "paused": "em pausa",
    "live": "em direto",
    "bridge": "ligação",
    "Front": "Frontal",
    "Back": "Traseira",
    "Silent": "Sem som",
    "Resume": "Retomar",
    "Pause": "Pausar",
    "Invite": "Convidar",
    "Leave": "Sair",
    "Room controls": "Controlos da sala",
    "Host controls": "Controlos do anfitrião",
    "Host desk": "Painel do anfitrião",
    "locked": "bloqueada",
    "open": "aberta",
    "waiting": "em espera",
    "removed": "removidos",
    "max": "máximo",
    "Alpha session activity": "Atividade da sessão alfa",
    "live with": "em direto com",
    "waiting:": "em espera:",
    "Admit next": "Deixar entrar o próximo",
    "Unlock room": "Desbloquear sala",
    "Lock room": "Bloquear sala",
    "Max": "Máximo",
    "Remove active": "Remover participante ativo",
    "Room status": "Estado da sala",
    "invite-only room": "sala apenas por convite",
    "no quiet viewers yet": "ainda sem observadores silenciosos",
    "with": "com",
    "admitted by host": "entrada autorizada pelo anfitrião",
    "waiting for host": "à espera do anfitrião",
    "Safety guard": "Proteção e segurança",
    "active": "ativa",
    "Lift pause shield": "Retomar e mostrar-me",
    "Pause and hide me": "Pausar e ocultar-me",
    "Contact shown": "Contacto visível",
    "Recording concern": "Possível gravação",
    "Suspected minor": "Suspeita de menor",
    "Harassment": "Assédio",
    "Consent concern": "Consentimento em dúvida",
    "Viewers limited": "Observadores limitados",
    "No viewers": "Sem observadores",
    "Viewers allowed": "Observadores permitidos",

    // Notices and connection fallback
    "Paused. Your camera is off.": "Em pausa. A tua câmara está desligada.",
    "Pause shield lifted. Turn camera on when ready.":
      "A pausa terminou. Liga a câmara quando quiseres continuar.",
    "Next participant admitted from the alpha queue.":
      "A próxima pessoa da fila alfa entrou na sala.",
    "Host removed this participant.": "O anfitrião removeu esta pessoa da sala.",
    "Active participant removed.": "A pessoa ativa foi removida.",
    "Witness mode is closed in this room.": "O modo de observador está desativado nesta sala.",
    "Private link room created.": "Sala privada por convite criada.",
    "Enter the current alpha phrase before copying the community room invite.":
      "Introduz a frase alfa atual antes de copiares o convite da sala da comunidade.",
    "Invite link copied.": "Link de convite copiado.",
    "You are back in the room queue. Re-entry opens in a moment.":
      "Voltaste à fila da sala. Poderás entrar novamente dentro de momentos.",
    "Developer fallback": "Alternativa para desenvolvimento",
    "Peer connection": "Ligação P2P",
    "Private bridge": "Ligação privada",
    "Connection role": "Papel na ligação",
    "Host": "Anfitrião",
    "Guest": "Convidado",
    "Peer": "Participante",
    "Create offer": "Criar oferta",
    "Copy offer": "Copiar oferta",
    "Apply answer": "Aplicar resposta",
    "Create answer": "Criar resposta",
    "Copy answer": "Copiar resposta",
    "Reset": "Repor",
    "Offer": "Oferta",
    "Answer": "Resposta",
    "Remote answer": "Resposta remota",
    "Remote offer": "Oferta remota",
    "manual P2P": "P2P manual",
    "gathering": "a recolher dados",
    "offer ready": "oferta pronta",
    "answer ready": "resposta pronta",
    "connecting": "a ligar",
    "connected": "ligado",
    "needs reset": "é necessário repor",
    "Could not create offer.": "Não foi possível criar a oferta.",
    "Could not create answer.": "Não foi possível criar a resposta.",
    "Paste a host offer first.": "Cola primeiro uma oferta do anfitrião.",
    "This signal belongs to another room.": "Este sinal pertence a outra sala.",
    "Create an offer first.": "Cria primeiro uma oferta.",
    "Paste a guest answer first.": "Cola primeiro uma resposta do convidado.",
    "Could not apply answer.": "Não foi possível aplicar a resposta.",
    "Signal is not ready yet.": "O sinal ainda não está pronto.",
    "Signal is not from this app.": "O sinal não pertence a esta aplicação.",
    "local alpha bridge connected": "ligação alfa local estabelecida",
    "local alpha bridge connecting": "ligação alfa local a estabelecer-se",
    "local alpha bridge ready": "ligação alfa local pronta",
    "admitted, starting bridge": "entrada autorizada; a iniciar ligação",
    "room locked": "sala bloqueada",
    "removed by host": "removido pelo anfitrião"
  });

  const englishVariantToSource = new Map(
    Object.entries(explicitEnglish).map(([source, revised]) => [revised, source])
  );

  function preferredLocale() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED_LOCALES.has(saved)) return saved;
    return navigator.language && navigator.language.toLowerCase().startsWith("pt") ? "pt-PT" : "en";
  }

  let currentLocale = preferredLocale();

  function translateDynamic(value, locale) {
    if (locale !== "pt-PT") return value;

    let match = value.match(/^(\d+) quiet viewer(s)?$/);
    if (match) return `${match[1]} ${Number(match[1]) === 1 ? "observador silencioso" : "observadores silenciosos"}`;

    match = value.match(/^· (\d+) (face|faces) blurred$/);
    if (match) return `· ${match[1]} ${Number(match[1]) === 1 ? "rosto desfocado" : "rostos desfocados"}`;

    match = value.match(/^(\d+) people present now · (\d+) quiet rooms active$/);
    if (match) return `${match[1]} pessoas presentes agora · ${match[2]} salas sem som ativas`;

    match = value.match(/^Link Room ([A-Z0-9]+)$/);
    if (match) return `Sala por convite ${match[1]}`;

    match = value.match(/^Seat (\d+)$/);
    if (match) return `Lugar ${match[1]}`;

    match = value.match(/^Seat (\d+) (visible|no-face|paused|viewer|removed) placeholder$/);
    if (match) {
      const states = {
        visible: "com câmara",
        "no-face": "rosto oculto",
        paused: "em pausa",
        viewer: "observador",
        removed: "fora da sala"
      };
      return `Exemplo do lugar ${match[1]}: ${states[match[2]]}`;
    }

    match = value.match(/^Returning to queue · (\d+)s$/);
    if (match) return `A voltar à fila · ${match[1]} s`;

    match = value.match(/^You are back in the queue\. Next room opens in (\d+)s\.$/);
    if (match) return `Voltaste à fila. A próxima sala abre dentro de ${match[1]} s.`;

    match = value.match(/^waiting in queue #(\d+)$/);
    if (match) return `em espera na fila n.º ${match[1]}`;

    match = value.match(/^queue #(\d+)$/);
    if (match) return `fila n.º ${match[1]}`;

    match = value.match(/^(\d+) waiting$/);
    if (match) return `${match[1]} em espera`;

    match = value.match(/^(\d+) removed$/);
    if (match) return `${match[1]} removidos`;

    match = value.match(/^max (\d+)$/i);
    if (match) return `máximo ${match[1]}`;

    match = value.match(/^(\d+) equal windows$/);
    if (match) return `${match[1]} janelas iguais`;

    match = value.match(/^(\d+) present$/);
    if (match) return `${match[1]} presentes`;

    match = value.match(/^(\d+) rooms active$/);
    if (match) return `${match[1]} salas ativas`;

    match = value.match(/^Back in queue\. Next room opens in (\d+)s\.$/);
    if (match) return `Voltaste à fila. A próxima sala abre dentro de ${match[1]} s.`;

    match = value.match(/^(.+) protected preview$/);
    if (match) return `Pré-visualização protegida de ${match[1]}`;

    match = value.match(/^(.+) video$/);
    if (match) return `Vídeo de ${match[1]}`;

    match = value.match(/^(.+) pulse$/);
    if (match) return `Enviar reação: ${portuguese[match[1]] || match[1]}`;

    match = value.match(/^(.+) pulse sent to the room\.$/);
    if (match) return `Reação enviada para a sala: ${portuguese[match[1]] || match[1]}.`;

    match = value.match(/^(.+) marked for review\.$/);
    if (match) return `Denúncia assinalada para análise: ${portuguese[match[1]] || match[1]}.`;

    match = value.match(/^(Offer|Answer) copied\.$/);
    if (match) return match[1] === "Offer" ? "Oferta copiada." : "Resposta copiada.";

    match = value.match(/^(.+) copied\.$/);
    if (match) return `${portuguese[match[1]] || match[1]} copiado.`;

    match = value.match(/^Back camera is not available on this device\.$/);
    if (match) return "A câmara traseira não está disponível neste dispositivo.";

    match = value.match(/^Front camera is not available on this device\.$/);
    if (match) return "A câmara frontal não está disponível neste dispositivo.";

    return value;
  }

  function translateCore(value, locale) {
    const source = englishVariantToSource.get(value) || value;
    if (locale === "en") return explicitEnglish[source] || source;
    return portuguese[source] || translateDynamic(source, locale);
  }

  function translateValue(value, locale) {
    if (typeof value !== "string" || value.length === 0) return value;
    const match = value.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!match || !match[2]) return value;
    return `${match[1]}${translateCore(match[2], locale)}${match[3]}`;
  }

  function skippedElement(element) {
    return Boolean(
      !element ||
      element.closest("[data-language-switcher]") ||
      element.closest("script, style, textarea, code, pre")
    );
  }

  function translateTextNode(node) {
    if (!node.parentElement || skippedElement(node.parentElement)) return;
    const current = node.nodeValue || "";
    let state = textState.get(node);
    if (!state) state = { source: current, lastApplied: current };
    else if (current !== state.lastApplied) state.source = current;

    let translated = translateValue(state.source, currentLocale);
    if (
      currentLocale === "pt-PT" &&
      state.source.trim() === "present" &&
      node.parentElement.closest(".community-activity")
    ) {
      translated = state.source.replace("present", "presentes");
    }
    if (
      currentLocale === "pt-PT" &&
      state.source.trim() === "Visible" &&
      node.parentElement.closest(".video-tile")
    ) {
      translated = state.source.replace("Visible", "Visível");
    }
    state.lastApplied = translated;
    textState.set(node, state);
    if (current !== translated) node.nodeValue = translated;
  }

  function translateAttribute(element, attribute) {
    if (skippedElement(element) || !element.hasAttribute(attribute)) return;
    let states = attributeState.get(element);
    if (!states) {
      states = new Map();
      attributeState.set(element, states);
    }

    const current = element.getAttribute(attribute) || "";
    let state = states.get(attribute);
    if (!state) state = { source: current, lastApplied: current };
    else if (current !== state.lastApplied) state.source = current;

    const translated = translateValue(state.source, currentLocale);
    state.lastApplied = translated;
    states.set(attribute, state);
    if (current !== translated) element.setAttribute(attribute, translated);
  }

  function translateElement(element) {
    if (skippedElement(element)) return;
    TRANSLATED_ATTRIBUTES.forEach((attribute) => translateAttribute(element, attribute));
  }

  function translateTree(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;

    if (root.nodeType === Node.ELEMENT_NODE) translateElement(root);
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
    );
    let node = walker.nextNode();
    while (node) {
      if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
      else translateElement(node);
      node = walker.nextNode();
    }
  }

  function updateMetadata() {
    document.documentElement.lang = currentLocale;
    document.title = "Cum Together";
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = currentLocale === "pt-PT"
        ? "Um espaço positivo e aberto sobre a sexualidade, exclusivo para maiores de 18 anos, com salas de vídeo sem mostrar o rosto onde adultos podem masturbar-se em conjunto com privacidade."
        : "A sex-positive, adults-only, no-face video room where consenting adults can masturbate together privately, without rankings, DMs, or public profiles.";
    }
  }

  function updateSwitcher() {
    const switcher = document.querySelector("[data-language-switcher]");
    if (!switcher) return;
    const portugueseSelected = currentLocale === "pt-PT";
    switcher.setAttribute("aria-label", portugueseSelected ? "Idioma" : "Language");
    const label = switcher.querySelector(".language-switcher__label");
    if (label) label.textContent = portugueseSelected ? "Idioma" : "Language";
    switcher.querySelectorAll("button[data-locale]").forEach((button) => {
      const selected = button.dataset.locale === currentLocale;
      button.setAttribute("aria-pressed", String(selected));
      button.setAttribute(
        "aria-label",
        button.dataset.locale === "en" ? "English" : "Português (Portugal)"
      );
    });
  }

  function setLocale(locale) {
    if (!SUPPORTED_LOCALES.has(locale)) return;
    currentLocale = locale;
    localStorage.setItem(STORAGE_KEY, locale);
    updateMetadata();
    updateSwitcher();
    translateTree(document.body);
    window.dispatchEvent(new CustomEvent("cum-together:language-change", { detail: { locale } }));
  }

  function createSwitcher() {
    if (!document.body || document.querySelector("[data-language-switcher]")) return;
    const switcher = document.createElement("div");
    switcher.className = "language-switcher";
    switcher.dataset.languageSwitcher = "";
    switcher.setAttribute("role", "group");
    switcher.innerHTML = [
      '<span class="language-switcher__label">Language</span>',
      '<button type="button" data-locale="en" lang="en">EN</button>',
      '<button type="button" data-locale="pt-PT" lang="pt-PT">PT</button>'
    ].join("");
    switcher.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-locale]");
      if (button) setLocale(button.dataset.locale);
    });
    document.body.insertBefore(switcher, document.body.firstChild);
    updateSwitcher();
  }

  function localizeCanvasMessages() {
    const contextPrototype = window.CanvasRenderingContext2D && window.CanvasRenderingContext2D.prototype;
    if (!contextPrototype || contextPrototype.__cumTogetherLocalized) return;
    const nativeFillText = contextPrototype.fillText;
    contextPrototype.fillText = function (text) {
      const args = Array.prototype.slice.call(arguments, 1);
      const localized = typeof text === "string" ? translateCore(text, currentLocale) : text;
      return nativeFillText.call(this, localized, ...args);
    };
    Object.defineProperty(contextPrototype, "__cumTogetherLocalized", { value: true });
  }

  const observer = new MutationObserver((records) => {
    records.forEach((record) => {
      if (record.type === "characterData") translateTextNode(record.target);
      if (record.type === "attributes") translateAttribute(record.target, record.attributeName);
      if (record.type === "childList") record.addedNodes.forEach(translateTree);
    });
  });

  function start() {
    createSwitcher();
    localizeCanvasMessages();
    updateMetadata();
    translateTree(document.body);
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: TRANSLATED_ATTRIBUTES
    });
  }

  window.CumTogetherI18n = Object.freeze({
    getLocale: () => currentLocale,
    setLocale,
    translate: (value) => translateValue(value, currentLocale)
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
