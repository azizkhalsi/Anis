import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';
import OscilloscopeDisplay from './OscilloscopeDisplay';
import { PRODUCTS } from '../constants/productsData';

const DMK_HMI_VISUALISATION_SRC = '/hmi/dmk-hmi-visualisation.png';
const DMK_HMI_CALIBRATION_SRC = '/hmi/dmk-hmi-calibration.png';
const DMK_REAL_MODEL_SRC = '/images/dmk-real-model.png';

const LCI_PCB_SRC = '/images/lci-pcb.png';
const AMC_IMG_INTEGRATION = '/images/amc/amc-integration-hardware.png';
const AMC_IMG_SENSORLESS_DIAGRAM = '/images/amc/amc-sensorless-diagram.png';

function DmkVisual() {
  const { t } = useTranslation();
  const [showSpecs, setShowSpecs] = useState(false);
  const specs = t('products.dmk.specs', { returnObjects: true });
  const specsArray = Array.isArray(specs) ? specs : [];

  return (
    <div
      className="dmk-photo-visual"
      onMouseEnter={() => setShowSpecs(true)}
      onMouseLeave={() => setShowSpecs(false)}
    >
      <img
        src="/images/dmk-connections.png"
        alt={t('products.dmk.photoAlt')}
        className="dmk-photo-img"
        width="800"
        height="450"
        loading="lazy"
        decoding="async"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className={`dmk-specs-overlay ${showSpecs ? 'visible' : ''}`}>
        <div className="dmk-specs-grid">
          {specsArray.map((spec, i) => (
            <div key={i} className="dmk-spec-item">
              <span className="dmk-spec-value">{spec?.value}</span>
              <span className="dmk-spec-label">{spec?.label}</span>
            </div>
          ))}
        </div>
        <span className="dmk-specs-hint">{t('products.dmk.specsHint')}</span>
      </div>
      {!showSpecs && (
        <span className="dmk-hover-hint">{t('products.dmk.hoverHint')}</span>
      )}
    </div>
  );
}

function AmcVisual() {
  const { t } = useTranslation();
  return (
    <div className="amc-visual-wrapper">
      <div className="amc-visual-frame">
        <img
          src={AMC_IMG_INTEGRATION}
          alt={t('products.amc.integrationAlt')}
          className="amc-diagram-img"
          width="800"
          height="450"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

function LciVisual() {
  const { t } = useTranslation();
  return (
    <div className="lci-visual lci-visual--no-bg">
      <img
        src={LCI_PCB_SRC}
        alt={t('products.lci.pcbAlt')}
        className="lci-pcb-img"
        width="600"
        height="600"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function DmkPcSoftwareScene() {
  const { t } = useTranslation();
  const [screenOpen, setScreenOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('visualisation');

  return (
    <div className="dmk-pc-scene">
      <div className="dmk-pc-scene-desk dmk-pc-scene-desk--hub">
        <div className="dmk-pc-scene-desk-row dmk-pc-scene-desk-row--1">
        <div className="dmk-pc-scene-peripheral dmk-pc-scene-peripheral--pc">
          <div className="dmk-pc-scene-pc">
            <div className="dmk-pc-scene-pc-bezel">
              <div className={`dmk-pc-scene-screen ${screenOpen ? 'open' : ''}`}>
                {!screenOpen ? (
                  <div className="dmk-pc-scene-desktop">
                    <span className="dmk-pc-scene-desktop-label">{t('products.dmk.pcSceneDesktop')}</span>
                    <button
                      type="button"
                      className="dmk-pc-scene-dmk-icon"
                      onClick={() => setScreenOpen(true)}
                      aria-label={t('products.dmk.pcSceneOpenDmk')}
                    >
                      <span className="dmk-pc-scene-dmk-icon-symbol">DMK</span>
                      <span className="dmk-pc-scene-dmk-icon-name">DMK</span>
                    </button>
                  </div>
                ) : (
                  <div className="dmk-pc-scene-interface">
                    <div className="dmk-pc-scene-interface-header">
                      <button
                        type="button"
                        className="dmk-pc-scene-interface-back"
                        onClick={() => setScreenOpen(false)}
                        aria-label={t('products.dmk.pcSceneBack')}
                      >
                        {t('products.dmk.pcSceneBackLabel')}
                      </button>
                      <div className="dmk-pc-scene-interface-tabs">
                        <button
                          type="button"
                          className={`dmk-pc-scene-tab ${activeTab === 'visualisation' ? 'active' : ''}`}
                          onClick={() => setActiveTab('visualisation')}
                        >
                          {t('products.dmk.pcSceneVisualisation')}
                        </button>
                        <button
                          type="button"
                          className={`dmk-pc-scene-tab ${activeTab === 'calibration' ? 'active' : ''}`}
                          onClick={() => setActiveTab('calibration')}
                        >
                          {t('products.dmk.pcSceneCalibration')}
                        </button>
                      </div>
                    </div>
                    <div className="dmk-pc-scene-interface-content">
                      {activeTab === 'visualisation' && (
                        <div className="dmk-pc-scene-interface-pane dmk-pc-scene-interface-pane--visualisation">
                          <img
                            src={DMK_HMI_VISUALISATION_SRC}
                            alt={t('products.dmk.hmiVisualisationAlt')}
                            loading="lazy"
                          />
                        </div>
                      )}
                      {activeTab === 'calibration' && (
                        <div className="dmk-pc-scene-interface-pane dmk-pc-scene-interface-pane--calibration">
                          <img
                            src={DMK_HMI_CALIBRATION_SRC}
                            alt={t('products.dmk.hmiCalibrationAlt')}
                            loading="lazy"
                            className="dmk-pc-scene-calibration-img"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="dmk-pc-scene-pc-stand" />
            <div className="dmk-pc-scene-pc-base" />
          </div>
          <div className="dmk-pc-scene-cable-wrap dmk-pc-scene-cable-wrap--to-hub">
            <svg className="dmk-pc-scene-cable" viewBox="0 0 80 32" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <path className="dmk-pc-scene-cable-line" d="M 2 16 C 38 16 42 8 40 16 C 38 24 42 24 78 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="dmk-pc-scene-hub">
          <div className="dmk-pc-scene-device dmk-pc-scene-device--model3d dmk-pc-scene-device--hub">
            <div className="dmk-pc-scene-device-inner">
              <img src={DMK_REAL_MODEL_SRC} alt={t('products.dmk.deviceAlt')} className="dmk-pc-scene-device-img" loading="lazy" />
            </div>
          </div>
        </div>

        <div className="dmk-pc-scene-peripheral dmk-pc-scene-peripheral--scope">
          <div className="dmk-pc-scene-cable-wrap dmk-pc-scene-cable-wrap--to-hub">
            <svg className="dmk-pc-scene-cable" viewBox="0 0 80 32" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <path className="dmk-pc-scene-cable-line" d="M 2 16 C 38 16 42 8 40 16 C 38 24 42 24 78 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="dmk-pc-scene-oscilloscope">
            <div className="dmk-pc-scene-oscilloscope-frame">
              <OscilloscopeDisplay />
            </div>
          </div>
        </div>
        </div>

      <div className="dmk-pc-scene-cable-wrap dmk-pc-scene-cable-wrap--to-hub dmk-pc-scene-cable-wrap--vertical dmk-pc-scene-cable-wrap--hub-usb">
        <svg className="dmk-pc-scene-cable" viewBox="0 0 32 60" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <path className="dmk-pc-scene-cable-line" d="M 16 2 C 16 28 10 32 16 58" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="dmk-pc-scene-desk-row dmk-pc-scene-desk-row--usb">
        <div className="dmk-pc-scene-peripheral dmk-pc-scene-peripheral--usb">
          <div className="dmk-pc-scene-usb">
            <div className="dmk-pc-scene-usb-inner">
              <div className="dmk-pc-scene-usb-slot" aria-hidden="true" />
              <span className="dmk-pc-scene-usb-label">USB</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function HighlightIcon({ type }) {
  const icons = {
    scope: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    log: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>,
    pwm: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>,
    rotor: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
    cost: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
    motor: <><circle cx="12" cy="12" r="10" /><path d="M12 6v12M6 12h12" /></>,
    modular: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>,
    compact: <><rect x="2" y="7" width="20" height="15" rx="2" /><path d="M17 2l-5 5-5-5" /></>,
    auto: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
    plug: <><path d="M12 22V12M8 5v4M16 5v4M5 9h14v3a7 7 0 0 1-14 0V9z" /></>,
    sil: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
    all: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  );
}

const VISUALS = { dmk: DmkVisual, lci: LciVisual, amc: AmcVisual };

export default function Products({ initialProduct = 'dmk', singleMode = false }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(initialProduct);
  const navRef = useRef(null);
  const featureBlocksRef = useRef(null);
  const hmiSectionRef = useRef(null);
  const demoEmbedRef = useRef(null);
  const amcBenefitsRef = useRef(null);
  const amcGameChangerRef = useRef(null);
  const amcSensorlessRef = useRef(null);
  const comparisonRef = useRef(null);
  const navVisible = useScrollAnimation(navRef);
  const featureBlocksVisible = useScrollAnimation(featureBlocksRef, { threshold: 0.08 });
  const hmiVisible = useScrollAnimation(hmiSectionRef, { threshold: 0.08 });
  const demoEmbedVisible = useScrollAnimation(demoEmbedRef, { threshold: 0.08 });
  const amcBenefitsVisible = useScrollAnimation(amcBenefitsRef, { threshold: 0.08 });
  const amcGameChangerVisible = useScrollAnimation(amcGameChangerRef, { threshold: 0.08 });
  const amcSensorlessVisible = useScrollAnimation(amcSensorlessRef, { threshold: 0.08 });
  const comparisonVisible = useScrollAnimation(comparisonRef, { threshold: 0.08 });
  const product = PRODUCTS.find((p) => p.id === active);
  const Visual = VISUALS[active];
  const productName = product ? t(`products.${active}.name`) : '';
  const productTagline = product ? t(`products.${active}.tagline`) : '';
  const productBadge = product ? t(`products.${active}.badge`) : '';
  const productHero = product ? t(`products.${active}.hero`) : '';
  const productDescription = product ? t(`products.${active}.description`, { returnObjects: true }) : [];
  const productHighlights = product ? t(`products.${active}.highlights`, { returnObjects: true }) : [];
  const productTags = product ? t(`products.${active}.tags`, { returnObjects: true }) : [];

  useEffect(() => {
    if (initialProduct && PRODUCTS.some((p) => p.id === initialProduct)) {
      queueMicrotask(() => setActive(initialProduct));
    }
  }, [initialProduct]);

  return (
    <section className={`products ${singleMode ? 'products--single' : ''}`} id="products">
      <div className="container">
          {!singleMode && (
          <div className={`product-nav ${navVisible ? 'visible' : ''}`} ref={navRef} data-animate="fade-up">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`product-nav-btn ${active === p.id ? 'active' : ''}`}
                onClick={() => setActive(p.id)}
              >
                <span className="product-nav-name">{t(`products.${p.id}.name`)}</span>
                <span className="product-nav-tagline">{t(`products.${p.id}.tagline`)}</span>
              </button>
            ))}
          </div>
        )}

        <div className="product-showcase-v2" key={product.id}>
          <div className="product-showcase-top">
            <div className="product-showcase-info">
              <span className={`product-badge ${product.badgeClass}`}>{productBadge}</span>
              <h3 className="product-showcase-name">{productName}</h3>
              <p className="product-showcase-tagline">{productTagline}</p>
              <p className="product-showcase-hero">{productHero}</p>
            </div>
            <div className="product-showcase-visual">
              <Visual />
            </div>
          </div>

          <div className="product-highlights">
            {Array.isArray(productHighlights) && productHighlights.map((h, idx) => (
              <div className="product-highlight-card" key={h?.label ?? idx}>
                <div className="product-highlight-icon">
                  <HighlightIcon type={product.highlights[idx]?.icon ?? 'scope'} />
                </div>
                <strong>{h?.label}</strong>
                <span>{h?.detail}</span>
              </div>
            ))}
          </div>

          <div className="product-showcase-body">
            <div className="product-showcase-desc">
              {Array.isArray(productDescription) && productDescription.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="product-tags">
            {Array.isArray(productTags) && productTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          {active === 'dmk' && (
            <>
              <div
                className={`dmk-feature-blocks ${featureBlocksVisible ? 'visible' : ''}`}
                ref={featureBlocksRef}
                data-animate="fade-up"
              >
                <h4 className="dmk-feature-blocks-title">{t('products.dmk.featureBlocksTitle')}</h4>
                <div className="dmk-feature-blocks-grid">
                  {(t('products.dmk.featureBlocks', { returnObjects: true }) || []).map((block, i) => (
                    <div key={i} className="dmk-feature-block">
                      <h5 className="dmk-feature-block-title">{block?.title}</h5>
                      <p className="dmk-feature-block-body">{block?.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`dmk-hmi-section ${hmiVisible ? 'visible' : ''}`}
                ref={hmiSectionRef}
                data-animate="fade-up"
              >
                <h4 className="dmk-hmi-title">{t('products.dmk.hmiTitle')}</h4>
                <DmkPcSoftwareScene />
              </div>

              <div
                className={`dmk-demo-embed-section ${demoEmbedVisible ? 'visible' : ''}`}
                ref={demoEmbedRef}
                data-animate="fade-up"
              >
                <div className="dmk-demo-embed-head">
                  <h4 className="dmk-demo-embed-title">{t('products.dmk.demoEmbedTitle')}</h4>
                  <p className="dmk-demo-embed-intro">{t('products.dmk.demoEmbedIntro')}</p>
                </div>
                <div className="dmk-demo-embed-content">
                  <ul className="dmk-demo-embed-list">
                    {(t('products.dmk.demoEmbedList', { returnObjects: true }) || []).map((item, i) => (
                      <li key={i}><strong>{item?.term}</strong> — {item?.desc}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={`product-comparison ${comparisonVisible ? 'visible' : ''}`}
                ref={comparisonRef}
                data-animate="fade-up"
              >
                <h4 className="product-comparison-title">{t('products.comparison.dmk.title')}</h4>
                <div className="product-comparison-table-wrap">
                  <table className="product-comparison-table">
                    <thead>
                      <tr>
                        <th>{t('products.comparison.dmk.leftLabel')}</th>
                        <th>{t('products.comparison.dmk.rightLabel')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(t('products.comparison.dmk.rows', { returnObjects: true }) || []).map((row, i) => (
                        <tr key={i}>
                          <td>{row?.left}</td>
                          <td>{row?.right}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {active === 'amc' && (
            <>
              <div
                className={`amc-benefits-section ${amcBenefitsVisible ? 'visible' : ''}`}
                ref={amcBenefitsRef}
                data-animate="fade-up"
              >
                <h4 className="amc-section-title">{t('products.amc.benefitsTitle')}</h4>
                <div className="amc-benefits-grid">
                  {(t('products.amc.benefits', { returnObjects: true }) || []).map((item, i) => (
                    <div key={i} className="amc-benefit-card" style={{ transitionDelay: `${i * 80}ms` }}>
                      <span className="amc-benefit-number">0{i + 1}</span>
                      <h5 className="amc-benefit-title">{item?.title}</h5>
                      <p className="amc-benefit-body">{item?.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`amc-gamechanger-section ${amcGameChangerVisible ? 'visible' : ''}`}
                ref={amcGameChangerRef}
                data-animate="fade-up"
              >
                <h3 className="amc-gamechanger-headline">{t('products.amc.gameChangerHeadline')}</h3>
                <ul className="amc-gamechanger-list">
                  {(t('products.amc.motorControlItems', { returnObjects: true }) || []).map((text, i) => (
                    <li key={i} className="amc-gamechanger-item" style={{ transitionDelay: `${i * 60}ms` }}>
                      <span className="amc-gamechanger-dot" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`amc-sensorless-section ${amcSensorlessVisible ? 'visible' : ''}`}
                ref={amcSensorlessRef}
                data-animate="fade-up"
              >
                <h4 className="amc-section-title amc-section-title--sensorless">{t('products.amc.sensorlessTitle')}</h4>
                <div className="amc-sensorless-diagram-wrap">
                  <img
                    src={AMC_IMG_SENSORLESS_DIAGRAM}
                    alt={t('products.amc.sensorlessDiagramAlt')}
                    className="amc-sensorless-diagram-img"
                    loading="lazy"
                  />
                </div>
                <div className="amc-sensorless-cards">
                  {(t('products.amc.sensorlessItems', { returnObjects: true }) || []).map((text, i) => (
                    <div key={i} className="amc-sensorless-card" style={{ transitionDelay: `${i * 70}ms` }}>
                      <span className="amc-sensorless-icon" aria-hidden>✓</span>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`product-comparison ${comparisonVisible ? 'visible' : ''}`}
                ref={comparisonRef}
                data-animate="fade-up"
              >
                <h4 className="product-comparison-title">{t('products.comparison.amc.title')}</h4>
                <div className="product-comparison-table-wrap">
                  <table className="product-comparison-table">
                    <thead>
                      <tr>
                        <th>{t('products.comparison.amc.leftLabel')}</th>
                        <th>{t('products.comparison.amc.rightLabel')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(t('products.comparison.amc.rows', { returnObjects: true }) || []).map((row, i) => (
                        <tr key={i}>
                          <td>{row?.left}</td>
                          <td>{row?.right}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {active === 'lci' && (
            <div
              className={`product-comparison ${comparisonVisible ? 'visible' : ''}`}
              ref={comparisonRef}
              data-animate="fade-up"
            >
              <h4 className="product-comparison-title">{t('products.comparison.lci.title')}</h4>
              <div className="product-comparison-table-wrap">
                <table className="product-comparison-table">
                  <thead>
                    <tr>
                      <th>{t('products.comparison.lci.leftLabel')}</th>
                      <th>{t('products.comparison.lci.rightLabel')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(t('products.comparison.lci.rows', { returnObjects: true }) || []).map((row, i) => (
                      <tr key={i}>
                        <td>{row?.left}</td>
                        <td>{row?.right}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
