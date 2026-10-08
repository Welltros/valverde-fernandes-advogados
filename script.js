/* ==========================================================================
   VALVERDE & FERNANDES ADVOGADOS ASSOCIADOS - INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initAccessibility();
  initPracticeFilter();
  initPhoneMask();
  initDiagnosticTool();
  initScrollSpy();
});

/* --------------------------------------------------------------------------
   1. HEADER SCROLL & MOBILE MENU
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = toggleBtn.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }
}

/* ScrollSpy for active nav links */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. ACCESSIBILITY CONTROLS (HIGH CONTRAST & FONT SIZE)
   -------------------------------------------------------------------------- */
function initAccessibility() {
  const btnContrast = document.getElementById('btnContrastToggle');
  const btnIncrease = document.getElementById('btnFontIncrease');
  const btnReset = document.getElementById('btnFontReset');

  // Load preferences
  if (localStorage.getItem('vf_contrast') === 'enabled') {
    document.body.classList.add('high-contrast');
  }
  if (localStorage.getItem('vf_font_size') === 'large') {
    document.body.classList.add('font-large');
  }

  if (btnContrast) {
    btnContrast.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      const isHigh = document.body.classList.contains('high-contrast');
      localStorage.setItem('vf_contrast', isHigh ? 'enabled' : 'disabled');
    });
  }

  if (btnIncrease) {
    btnIncrease.addEventListener('click', () => {
      document.body.classList.add('font-large');
      localStorage.setItem('vf_font_size', 'large');
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      document.body.classList.remove('font-large');
      localStorage.setItem('vf_font_size', 'normal');
    });
  }
}

/* --------------------------------------------------------------------------
   3. PRACTICE AREAS FILTER
   -------------------------------------------------------------------------- */
function initPracticeFilter() {
  const filterBtns = document.querySelectorAll('.practice-tab-btn');
  const cards = document.querySelectorAll('.practice-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. PRACTICE AREA DETAIL MODAL DATA & HANDLER
   -------------------------------------------------------------------------- */
const practiceModalData = {
  previdenciario: {
    title: 'Direito Previdenciário (INSS & Regimes Próprios)',
    body: `
      <div style="line-height: 1.65; color: #334155;">
        <p style="margin-bottom: 16px;">
          Nossa equipe previdenciária atua de forma humanizada e combativa contra indeferimentos indevidos do INSS, garantindo o melhor valor de benefício mensal e o pagamento de todos os retroativos devidos.
        </p>
        
        <h4 style="color: #070e1b; font-size: 1.1rem; margin: 20px 0 10px;">📋 Principais Ações & Serviços:</h4>
        <ul style="list-style: disc; margin-left: 20px; margin-bottom: 20px;">
          <li><strong>Planejamento Previdenciário:</strong> Estudo técnico minucioso do seu histórico de contribuições para encontrar a melhor regra de transição e o valor máximo de aposentadoria.</li>
          <li><strong>BPC / LOAS:</strong> Obtenção de 1 salário mínimo mensal para idosos (+65 anos) ou pessoas com deficiência/doença crônica em vulnerabilidade econômica.</li>
          <li><strong>Aposentadoria Especial:</strong> Conversão de tempo trabalhado com insalubridade ou periculosidade (médicos, enfermeiros, vigilantes, metalúrgicos, motoristas).</li>
          <li><strong>Auxílio por Incapacidade & Invalidez:</strong> Reversão judicial de laudos periciais negativos do INSS.</li>
          <li><strong>Pensão por Morte & Revisões:</strong> Concessão de pensão indeferida e revisões de valores incorretos de RMI.</li>
        </ul>

        <h4 style="color: #070e1b; font-size: 1.1rem; margin: 20px 0 10px;">📑 Documentos Recomendados para Início:</h4>
        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
          • RG e CPF<br>
          • Comprovante de residência atualizado<br>
          • Extrato CNIS (disponível no app Meu INSS)<br>
          • Carteiras de Trabalho (todas as vias)<br>
          • Laudos, exames ou receitas médicas (se houver pedido por incapacidade/BPC)
        </div>

        <a href="https://wa.me/5521987644666?text=Ol%C3%A1%2C%20Dra.%20Mariana%20Fernandes.%20Gostaria%20de%20uma%20an%C3%A1lise%20do%20meu%20caso%20previdenci%C3%A1rio%20(INSS)." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%;">
          <i class="fa-brands fa-whatsapp"></i> Falar com Dra. Mariana Fernandes no WhatsApp
        </a>
      </div>
    `
  },
  trabalhista: {
    title: 'Direito Trabalhista Estratégico',
    body: `
      <div style="line-height: 1.65; color: #334155;">
        <p style="margin-bottom: 16px;">
          Atuamos na defesa rigorosa dos direitos do trabalhador contra abusos corporativos, fraudes de contratação e sonegação de verbas rescisórias.
        </p>

        <h4 style="color: #070e1b; font-size: 1.1rem; margin: 20px 0 10px;">📋 Principais Causas Atendidas:</h4>
        <ul style="list-style: disc; margin-left: 20px; margin-bottom: 20px;">
          <li><strong>Rescisão Indireta (Art. 483 CLT):</strong> Saída do emprego com recebimento de todas as verbas rescisórias, seguro-desemprego e multa de 40% do FGTS quando a empresa comete faltas graves.</li>
          <li><strong>Pejotização Fraudulenta:</strong> Reconhecimento de vínculo empregatício e pagamento retroativo de FGTS, férias, 13º e horas extras para profissionais contratados como PJ com subordinação.</li>
          <li><strong>Horas Extras e Intervalos:</strong> Cobrança de sobrejornada, plantões, horas de sobreaviso e não concessão de intervalo intrajornada.</li>
          <li><strong>Acidentes de Trabalho & Síndrome de Burnout:</strong> Indenizações por danos morais, materiais, reintegração com estabilidade e pensão mensal.</li>
          <li><strong>Assédio Moral & Discriminação:</strong> Reparação financeira por humilhações, cobranças abusivas e tratamento degradante.</li>
        </ul>

        <h4 style="color: #070e1b; font-size: 1.1rem; margin: 20px 0 10px;">📑 Documentos Recomendados para Início:</h4>
        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
          • CTPS (Carteira de Trabalho física ou digital)<br>
          • Holerites ou extratos bancários de depósito<br>
          • TRCT (Termo de Rescisão de Contrato, se houver)<br>
          • Mensagens de WhatsApp, e-mails ou provas de cobranças de metas e horários
        </div>

        <a href="https://wa.me/5521987644666?text=Ol%C3%A1%2C%20Dr.%20Fernando%20Valverde.%20Gostaria%20de%20uma%20an%C3%A1lise%20da%20minha%20situa%C3%A7%C3%A3o%20trabalhista." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%;">
          <i class="fa-brands fa-whatsapp"></i> Falar com Dr. Fernando Valverde no WhatsApp
        </a>
      </div>
    `
  },
  civil: {
    title: 'Direito Civil, Família & Sucessões',
    body: `
      <div style="line-height: 1.65; color: #334155;">
        <p style="margin-bottom: 16px;">
          Especializados na proteção patrimonial e na resolução rápida e pacífica de inventários, partilhas de bens, divórcios e contratos imobiliários.
        </p>

        <h4 style="color: #070e1b; font-size: 1.1rem; margin: 20px 0 10px;">📋 Principais Demandas Cíveis:</h4>
        <ul style="list-style: disc; margin-left: 20px; margin-bottom: 20px;">
          <li><strong>Inventário Extrajudicial em Cartório:</strong> Conclusão da partilha de bens em prazos recordes de 30 a 60 dias, economizando tempo e custas judiciais.</li>
          <li><strong>Inventário Judicial Litigioso:</strong> Defesa combativa dos direitos dos herdeiros contra ocultação de bens, fraudes ou impugnações de testamentos.</li>
          <li><strong>Divórcio & Dissolução de União Estável:</strong> Partilha equitativa do patrimônio, fixação de pensão alimentícia e regulamentação de guarda.</li>
          <li><strong>Direito Imobiliário:</strong> Ações de despejo, usucapião urbano e rural, regularização de escrituras e rescisão contratual com devolução de valores.</li>
          <li><strong>Indenizações por Danos Morais e Materiais:</strong> Litígios contratuais, prejuízos patrimoniais e defesa do consumidor.</li>
        </ul>

        <h4 style="color: #070e1b; font-size: 1.1rem; margin: 20px 0 10px;">📑 Documentos Recomendados para Início:</h4>
        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
          • Certidão de Óbito (em caso de inventário) ou Certidão de Casamento<br>
          • Matrículas e escrituras atualizadas dos imóveis<br>
          • Documentos dos herdeiros e extratos bancários<br>
          • Contratos firmados em caso de litígio imobiliário/comercial
        </div>

        <a href="https://wa.me/5521987644666?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20sobre%20Invent%C3%A1rio%20%2F%20Direito%20Civil." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%;">
          <i class="fa-brands fa-whatsapp"></i> Iniciar Atendimento Cível no WhatsApp
        </a>
      </div>
    `
  }
};

function openPracticeModal(category) {
  const modal = document.getElementById('practiceModal');
  const titleElem = document.getElementById('practiceModalTitle');
  const bodyElem = document.getElementById('practiceModalBody');

  if (practiceModalData[category]) {
    titleElem.textContent = practiceModalData[category].title;
    bodyElem.innerHTML = practiceModalData[category].body;
    modal.classList.add('active');
  }
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE LEGAL DIAGNOSTIC TOOL WIZARD
   -------------------------------------------------------------------------- */
let diagnosticState = {
  area: '',
  areaName: '',
  situation: '',
  time: ''
};

const diagnosticQuestionsMap = {
  previdenciario: [
    { text: 'INSS negou meu pedido de Aposentadoria / Auxílio', icon: 'fa-ban' },
    { text: 'Quero planejar minha aposentadoria para ganhar o valor máximo', icon: 'fa-chart-line' },
    { text: 'Preciso solicitar o BPC/LOAS (Idoso ou PcD)', icon: 'fa-wheelchair' },
    { text: 'Estou afastado por doença/acidente e cortaram meu benefício', icon: 'fa-heart-crack' },
    { text: 'Quero pedir Revisão do valor que já recebo mensalmente', icon: 'fa-arrows-rotate' }
  ],
  trabalhista: [
    { text: 'Fui demitido sem justa causa e falta pagar verbas/FGTS', icon: 'fa-door-open' },
    { text: 'Trabalho como PJ sem autonomia e quero meus direitos CLT', icon: 'fa-file-invoice' },
    { text: 'A empresa atrasa salários/FGTS e quero Rescisão Indireta', icon: 'fa-triangle-exclamation' },
    { text: 'Trabalho horas extras sem receber ou sem intervalo', icon: 'fa-clock' },
    { text: 'Sofri acidente de trabalho, assédio moral ou burnout', icon: 'fa-shield-heart' }
  ],
  civil: [
    { text: 'Preciso fazer Inventário e partilha de bens de parente', icon: 'fa-file-signature' },
    { text: 'Desejo realizar Divórcio, Partilha ou Pensão Alimentícia', icon: 'fa-ring' },
    { text: 'Problema com Imóvel (usucapião, despejo ou contrato de compra)', icon: 'fa-house-circle-exclamation' },
    { text: 'Quero cobrar uma dívida com bloqueio de bens do devedor', icon: 'fa-hand-holding-dollar' },
    { text: 'Sofri prejuízo financeiro/moral e quero indenização', icon: 'fa-gavel' }
  ]
};

function initDiagnosticTool() {
  // Initial state setup
}

function selectDiagnosticArea(areaKey, elem) {
  diagnosticState.area = areaKey;
  diagnosticState.areaName = areaKey === 'previdenciario' ? 'Previdenciário (INSS)' : areaKey === 'trabalhista' ? 'Trabalhista' : 'Civil / Família';

  // Populate Step 2 options
  const container = document.getElementById('diagStep2Options');
  container.innerHTML = '';

  const options = diagnosticQuestionsMap[areaKey] || [];
  options.forEach(opt => {
    const card = document.createElement('div');
    card.className = 'option-card';
    card.innerHTML = `
      <div class="option-icon"><i class="fa-solid ${opt.icon}"></i></div>
      <div class="option-text">
        <h4>${opt.text}</h4>
      </div>
    `;
    card.onclick = () => selectDiagnosticSituation(opt.text, card);
    container.appendChild(card);
  });

  goToDiagnosticStep(2);
}

function selectDiagnosticSituation(situationText, elem) {
  diagnosticState.situation = situationText;
  goToDiagnosticStep(3);
}

function selectDiagnosticTime(timeText, elem) {
  diagnosticState.time = timeText;
  calculateDiagnosticResult();
  goToDiagnosticStep(4);
}

function goToDiagnosticStep(stepNumber) {
  for (let i = 1; i <= 4; i++) {
    const stepElem = document.getElementById(`diagStep${i}`);
    const indElem = document.getElementById(`stepIndicator${i}`);
    if (stepElem) stepElem.classList.remove('active');
    if (indElem) {
      indElem.classList.remove('active');
      if (i < stepNumber) {
        indElem.classList.add('completed');
      } else {
        indElem.classList.remove('completed');
      }
    }
  }

  const currentStep = document.getElementById(`diagStep${stepNumber}`);
  const currentInd = document.getElementById(`stepIndicator${stepNumber}`);
  if (currentStep) currentStep.classList.add('active');
  if (currentInd) currentInd.classList.add('active');
}

function calculateDiagnosticResult() {
  const resultTitle = document.getElementById('diagResultTitle');
  const resultDesc = document.getElementById('diagResultDescription');
  const btnWhatsApp = document.getElementById('btnSendDiagWhatsApp');

  resultTitle.textContent = `Caso com alta viabilidade identificado em ${diagnosticState.areaName}!`;
  resultDesc.innerHTML = `
    Identificamos que seu caso envolve: <strong>"${diagnosticState.situation}"</strong> ocorrido há <strong>${diagnosticState.time}</strong>.<br><br>
    Nossos advogados especialistas já atuaram em casos idênticos e possuem precedentes favoráveis para defender seus direitos com agilidade.
  `;

  // Pre-filled WhatsApp message URL
  const textMessage = `Olá, Dr. Valverde e Dra. Mariana! Fiz o Diagnóstico Jurídico no site e gostaria de orientação para o meu caso:\n\n• Área: ${diagnosticState.areaName}\n• Situação: ${diagnosticState.situation}\n• Tempo decorrido: ${diagnosticState.time}\n\nPodem me orientar sobre os próximos passos?`;
  const encodedText = encodeURIComponent(textMessage);
  btnWhatsApp.href = `https://wa.me/5521987644666?text=${encodedText}`;
}

function resetDiagnostic() {
  diagnosticState = { area: '', areaName: '', situation: '', time: '' };
  goToDiagnosticStep(1);
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE SIMULATORS (CALCULATOR LOGIC)
   -------------------------------------------------------------------------- */
function switchSimTab(tabId, btn) {
  const tabs = document.querySelectorAll('.sim-tab-toggle');
  const panes = document.querySelectorAll('.sim-content-pane');

  tabs.forEach(t => t.classList.remove('active'));
  panes.forEach(p => p.classList.remove('active'));

  btn.classList.add('active');
  const targetPane = document.getElementById(tabId);
  if (targetPane) targetPane.classList.add('active');
}

/* Rescisão Calculator */
function calcularRescisao() {
  const salario = parseFloat(document.getElementById('simSalario').value) || 0;
  const meses = parseInt(document.getElementById('simMesesTrabalhados').value) || 0;
  const anos = parseInt(document.getElementById('simAnosEmpresa').value) || 0;
  const tipo = document.getElementById('simTipoDemissao').value;

  if (salario <= 0) {
    alert('Por favor, digite um valor de salário válido.');
    return;
  }

  // Dias de aviso prévio proporcional (Lei 12.506/11) = 30 + (3 * anos)
  const diasAviso = Math.min(90, 30 + (3 * anos));
  const valorDia = salario / 30;
  
  let avisoPrevio = 0;
  let decimoTerceiro = (salario / 12) * meses;
  let ferias = ((salario / 12) * meses) * 1.3333;
  let multaFgts = 0;

  // FGTS estimado total depositado = salario * 0.08 * (anos * 12 + meses)
  const totalMesesTrabalhados = (anos * 12) + meses;
  const fgtsSaldoEstimado = (salario * 0.08) * totalMesesTrabalhados;

  if (tipo === 'sem_justa_causa' || tipo === 'rescisao_indireta') {
    avisoPrevio = valorDia * diasAviso;
    multaFgts = fgtsSaldoEstimado * 0.40;
  } else if (tipo === 'acordo_mutuo') {
    avisoPrevio = (valorDia * diasAviso) * 0.5;
    multaFgts = fgtsSaldoEstimado * 0.20;
  } else if (tipo === 'pedido_demissao') {
    avisoPrevio = 0;
    multaFgts = 0;
  }

  const total = avisoPrevio + decimoTerceiro + ferias + multaFgts;

  const formatBRL = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  document.getElementById('rescisaoTotalDisplay').textContent = formatBRL(total);
  document.getElementById('itemAvisoPrevio').textContent = formatBRL(avisoPrevio);
  document.getElementById('item13Proporcional').textContent = formatBRL(decimoTerceiro);
  document.getElementById('itemFeriasProporcional').textContent = formatBRL(ferias);
  document.getElementById('itemMultaFgts').textContent = formatBRL(multaFgts);
}

/* BPC/LOAS Verification */
function verificarBpc() {
  const renda = document.getElementById('bpcRenda').value;
  const cadUnico = document.getElementById('bpcCadUnico').value;
  const resultTitle = document.getElementById('bpcResultTitle');
  const resultText = document.getElementById('bpcResultText');
  const badge = document.getElementById('bpcResultBadge');

  if (renda === 'ate_quarto' || renda === 'gastos_medicos') {
    badge.className = 'result-badge';
    badge.style.background = 'rgba(16, 185, 129, 0.12)';
    badge.style.color = '#10b981';
    badge.innerHTML = '<i class="fa-solid fa-check"></i> Alta Probabilidade de Concessão';
    resultTitle.textContent = 'Preenche os requisitos fundamentais para o BPC!';
    resultText.innerHTML = `
      Sua família se enquadra no critério de vulnerabilidade social. ${renda === 'gastos_medicos' ? '<strong>Importante:</strong> Gastos contínuos com remédios, fraldas e tratamentos podem ser abatidos judicialmente da renda familiar.' : ''}
      ${cadUnico === 'nao' ? '<br><br><em>Recomendamos providenciar a inscrição no CadÚnico no CRAS do seu bairro.</em>' : ''}
    `;
  } else {
    badge.className = 'result-badge';
    badge.style.background = 'rgba(245, 158, 11, 0.15)';
    badge.style.color = '#d97706';
    badge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Requer Análise Documental Detalhada';
    resultTitle.textContent = 'Necessária Auditoria dos Gastos da Família';
    resultText.textContent = 'Mesmo com renda superior, a Justiça Federal pode flexibilizar o critério econômico quando comprovada a extrema dependência de cuidados especiais. Fale com nossos advogados para analisar as despesas dedutíveis.';
  }
}

/* Inventário Comparison */
function compararInventario() {
  const menores = document.getElementById('invMenores').value;
  const acordo = document.getElementById('invAcordo').value;
  const testamento = document.getElementById('invTestamento').value;

  const badge = document.getElementById('invResultBadge');
  const title = document.getElementById('invResultTitle');
  const text = document.getElementById('invResultText');

  if (menores === 'nao' && acordo === 'sim') {
    badge.style.background = 'rgba(16, 185, 129, 0.12)';
    badge.style.color = '#10b981';
    badge.innerHTML = '<i class="fa-solid fa-bolt"></i> Via Recomendada: Extrajudicial (Cartório de Notas)';
    title.textContent = 'Inventário em Cartório: Rápido & Econômico';
    text.innerHTML = `
      <p><strong>Prazo estimado:</strong> 30 a 60 dias para conclusão da partilha.</p>
      <p style="margin-top: 8px;"><strong>Vantagens:</strong> Sem burocracia do tribunal, menores despesas de custas e liberação rápida para venda de imóveis e levantamento de contas bancárias.</p>
    `;
  } else {
    badge.style.background = 'rgba(197, 160, 89, 0.2)';
    badge.style.color = '#c5a059';
    badge.innerHTML = '<i class="fa-solid fa-scale-balanced"></i> Via Obrigatória: Inventário Judicial';
    title.textContent = 'Inventário Judicial em Vara de Família e Sucessões';
    text.innerHTML = `
      <p><strong>Motivo:</strong> ${menores === 'sim' ? 'Presença de herdeiros menores de 18 anos exige parecer do Ministério Público. ' : ''}${acordo === 'nao' ? 'Havendo divergência na partilha, o juiz decidirá a divisão justa. ' : ''}</p>
      <p style="margin-top: 8px;"><strong>Nossa atuação:</strong> Condução ágil com pedidos de alvará para venda antecipada de bens e custeio das despesas do espólio.</p>
    `;
  }
}

/* --------------------------------------------------------------------------
   7. FAQ ACCORDION HANDLER
   -------------------------------------------------------------------------- */
function toggleFaq(headerElem) {
  const item = headerElem.parentElement;
  const isOpen = item.classList.contains('open');

  // Close other open FAQ items
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(i => i.classList.remove('open'));

  if (!isOpen) {
    item.classList.add('open');
  }
}

/* --------------------------------------------------------------------------
   8. BLOG ARTICLE MODAL DATA & HANDLER
   -------------------------------------------------------------------------- */
const blogArticles = {
  1: {
    title: 'Como conseguir o BPC/LOAS mesmo com renda familiar acima do limite do INSS?',
    content: `
      <p style="margin-bottom: 14px;">O <strong>BPC (Benefício de Prestação Continuada)</strong>, previsto na Lei Orgânica da Assistência Social (LOAS), é a garantia de um salário mínimo mensal para idosos a partir de 65 anos ou pessoas com deficiência de qualquer idade que não possuam meios de prover a própria manutenção.</p>
      <h4 style="margin: 16px 0 8px;">O Critério do INSS vs. A Jurisprudência do STF e STJ</h4>
      <p style="margin-bottom: 14px;">Administrativamente, o INSS utiliza como régua rígida a renda familiar per capita de até 1/4 do salário mínimo. Porém, o Supremo Tribunal Federal (STF) já declarou esse critério como defasado.</p>
      <h4 style="margin: 16px 0 8px;">Como abater despesas essenciais na Justiça?</h4>
      <p style="margin-bottom: 14px;">Na via judicial conduzida por um advogado especialista, é possível deduzir da renda bruta familiar todos os gastos comprovados com medicamentos de uso contínuo, fraldas geriátricas, consultas particulares não fornecidas pelo SUS, alimentação especial e cuidadores. Com essas deduções, o requerente atinge o requisito e recebe o benefício com todos os retroativos.</p>
    `
  },
  2: {
    title: 'Rescisão Indireta: O que fazer quando a empresa comete abusos ou atrasa salários?',
    content: `
      <p style="margin-bottom: 14px;">A <strong>Rescisão Indireta</strong>, prevista no artigo 483 da CLT, é o mecanismo legal onde o trabalhador "demite a empresa" em razão de faltas graves cometidas pelo empregador, sem perder nenhuma de suas garantias.</p>
      <h4 style="margin: 16px 0 8px;">Principais Motivos de Rescisão Indireta:</h4>
      <ul style="list-style: disc; margin-left: 20px; margin-bottom: 14px;">
        <li>Atraso reiterado no pagamento de salários;</li>
        <li>Não recolhimento regular do FGTS na conta vinculada;</li>
        <li>Exigência de serviços superiores às forças do empregado ou contrários aos bons costumes;</li>
        <li>Prática de Assédio Moral (humilhações públicas, isolamento ou perseguição);</li>
        <li>Risco iminente de mal considerável ou trabalho perigoso sem fornecimento de EPI.</li>
      </ul>
      <h4 style="margin: 16px 0 8px;">Quais os direitos garantidos?</h4>
      <p>O trabalhador recebe 100% das verbas como se tivesse sido demitido sem justa causa: aviso prévio indenizado, férias + 1/3, 13º proporcional, saque integral do FGTS com a multa de 40% e liberação das guias do seguro-desemprego.</p>
    `
  },
  3: {
    title: 'Inventário em Cartório: Passo a passo para transferir bens em tempo recorde',
    content: `
      <p style="margin-bottom: 14px;">Desde a edição da Lei 11.441/2007, o <strong>Inventário Extrajudicial</strong> permite realizar a partilha de bens deixados pelo falecido diretamente em Cartório de Notas por meio de Escritura Pública, sem necessidade de ingressar com processo na Justiça.</p>
      <h4 style="margin: 16px 0 8px;">Quais os requisitos para fazer em Cartório?</h4>
      <ul style="list-style: disc; margin-left: 20px; margin-bottom: 14px;">
        <li>Todos os herdeiros devem ser maiores de 18 anos e capazes civilmente;</li>
        <li>Deve haver pleno acordo e consenso entre todos os herdeiros quanto à divisão;</li>
        <li>Presença obrigatória de um advogado habilitado (o mesmo advogado pode representar todos os herdeiros).</li>
      </ul>
      <h4 style="margin: 16px 0 8px;">Atenção ao Prazo do ITCMD!</h4>
      <p>O inventário deve ser aberto preferencialmente dentro do prazo de <strong>60 dias</strong> contados do falecimento para evitar a cobrança de multa moratória sobre o imposto de transmissão (ITCMD) cobrado pelo Estado.</p>
    `
  }
};

function openBlogModal(id) {
  const modal = document.getElementById('blogModal');
  const titleElem = document.getElementById('blogModalTitle');
  const bodyElem = document.getElementById('blogModalBody');

  if (blogArticles[id]) {
    titleElem.textContent = blogArticles[id].title;
    bodyElem.innerHTML = `
      <div style="line-height: 1.65; color: #334155;">
        ${blogArticles[id].content}
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
          <a href="https://wa.me/5521987644666?text=Ol%C3%A1%2C%20li%20o%20artigo%20no%20site%20sobre%20${encodeURIComponent(blogArticles[id].title)}%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%;">
            <i class="fa-brands fa-whatsapp"></i> Conversar com um Advogado sobre este Artigo
          </a>
        </div>
      </div>
    `;
    modal.classList.add('active');
  }
}

/* --------------------------------------------------------------------------
   9. MODAL CONTROL (CLOSE / OPEN)
   -------------------------------------------------------------------------- */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

function openPrivacyModal() {
  document.getElementById('privacyModal').classList.add('active');
}

function openTermsModal() {
  const modal = document.getElementById('privacyModal');
  modal.querySelector('h3').textContent = 'Termos de Uso do Site';
  modal.classList.add('active');
}

/* --------------------------------------------------------------------------
   10. FLOATING WHATSAPP CHAT POPUP
   -------------------------------------------------------------------------- */
function toggleWhatsAppPopup() {
  const popup = document.getElementById('whatsappPopup');
  if (popup) {
    popup.classList.toggle('active');
  }
}

/* --------------------------------------------------------------------------
   11. REAL-TIME PHONE MASK & CONTACT FORM SUBMIT
   -------------------------------------------------------------------------- */
function initPhoneMask() {
  const phoneInput = document.getElementById('formTelefone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.substring(0, 11);

      if (v.length > 10) {
        // (11) 98765-4321
        v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (v.length > 5) {
        // (11) 9876-5432
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
      }
      e.target.value = v;
    });
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const nome = document.getElementById('formNome').value.trim();
  const tel = document.getElementById('formTelefone').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const area = document.getElementById('formArea').value;
  const msg = document.getElementById('formMensagem').value.trim();

  if (!nome || !tel || !email || !area || !msg) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const submitBtn = document.getElementById('btnSubmitForm');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando Solicitação...';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Solicitar Análise Jurídica';

    // Reset Form
    document.getElementById('contactForm').reset();

    // Show Success Modal
    document.getElementById('successModal').classList.add('active');
  }, 900);
}
