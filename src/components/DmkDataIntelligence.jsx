import { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import DmkAiVisual from './DmkAiVisual';
import DmkFaultDetectionDemo from './DmkFaultDetectionDemo';
import DmkFaultDetectionSim from './DmkFaultDetectionSim';
import DmkFlowchartSvg from './DmkFlowchartSvg';

const DMK_HIGH_SPEED_IMG = '/images/dmk-high-speed-acquisition.png';
const DMK_DATABASE_VIEWER_IMG = '/images/dmk-database-viewer.png';
const DMK_FAULT_DETECTOR_IMG = '/images/dmk-fault-detector.png';
const DMK_LIVE_DASHBOARD_IMG = '/images/dmk-live-dashboard.png';

/**
 * Data Intelligence section for DMK: the "Story" layout from the standalone
 * (Live → Problem → Solution with 3 steps). Supports variant="page" for
 * full-page layout on the DMK product page with real assets and viewport reveal.
 */
export default function DmkDataIntelligence({ variant }) {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const faultSimRef = useRef(null);
  const [faultSimState, setFaultSimState] = useState({ busy: false, fault: false });
  const isPage = variant === 'page';

  const onFaultSimStateChange = useCallback(({ busy, fault }) => {
    setFaultSimState({ busy, fault });
  }, []);

  // Reveal-on-scroll: viewport for page (smooth scroll-in), section root for tab
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = section.querySelectorAll('.dmk-story-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in');
        });
      },
      isPage
        ? { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.05 }
        : { root: section, rootMargin: '-20px 0px', threshold: 0.05 }
    );
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, [isPage]);

  return (
    <div
      ref={sectionRef}
      className={`dmk-data-intelligence dmk-data-intelligence--story${isPage ? ' dmk-data-intelligence--page' : ''}`}
      aria-label={t('products.dmk.dataIntel.ariaLabel')}
    >
      {/* Phase 1 — Live (design: left copy + right display unit) */}
      <section className="dmk-story-phase dmk-story-phase--live">
        <div className="dmk-story-phase-inner dmk-story-phase-inner--live-v2">
          <div className="dmk-story-text dmk-story-reveal dmk-story-reveal-left">
            <div className="dmk-story-live-badge dmk-story-live-badge--top">
              <span className="dmk-story-live-dot" aria-hidden />
              {t('products.dmk.dataIntel.storyLiveEyebrow')}
            </div>
            <h3 className="dmk-story-title dmk-story-title--live">{t('products.dmk.dataIntel.storyLiveTitle')}</h3>
            <p className="dmk-story-body dmk-story-body--live">{t('products.dmk.dataIntel.storyLiveBody')}</p>
            <a href="#products" className="dmk-story-live-cta">
              {t('products.dmk.dataIntel.exploreDmk')}
            </a>
          </div>
          <div className="dmk-story-visual dmk-story-reveal dmk-story-reveal-right">
            <div className="dmk-story-live-display">
              <img
                src={DMK_LIVE_DASHBOARD_IMG}
                alt={t('products.dmk.dataIntel.storyLiveTitle')}
                className="dmk-story-live-display-img"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Phase 2 — Problem */}
      <section className="dmk-story-phase dmk-story-phase--problem">
        <div className="dmk-story-phase-inner dmk-story-phase-inner--center">
          <div className="dmk-story-eyebrow dmk-story-eyebrow--problem dmk-story-reveal">
            <span className="dmk-story-eyebrow-dot" aria-hidden />
            {t('products.dmk.dataIntel.storyProblemTag')}
          </div>
          <h3 className="dmk-story-title dmk-story-title--problem dmk-story-reveal">
            {t('products.dmk.dataIntel.storyProblemTitle')}
          </h3>
          <p className="dmk-story-body dmk-story-body--center dmk-story-reveal">
            {t('products.dmk.dataIntel.storyProblemBody')}
          </p>
          <div className="dmk-story-pain-grid dmk-story-reveal">
            <div className="dmk-story-pain-card">
              <div className="dmk-story-pain-icon dmk-story-pain-icon--red" aria-hidden>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg></div>
              <div className="dmk-story-pain-title">{t('products.dmk.dataIntel.storyPain1Title')}</div>
              <div className="dmk-story-pain-body">{t('products.dmk.dataIntel.storyPain1Body')}</div>
            </div>
            <div className="dmk-story-pain-card">
              <div className="dmk-story-pain-icon dmk-story-pain-icon--amber" aria-hidden>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
              <div className="dmk-story-pain-title">{t('products.dmk.dataIntel.storyPain2Title')}</div>
              <div className="dmk-story-pain-body">{t('products.dmk.dataIntel.storyPain2Body')}</div>
            </div>
            <div className="dmk-story-pain-card">
              <div className="dmk-story-pain-icon dmk-story-pain-icon--red" aria-hidden>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg></div>
              <div className="dmk-story-pain-title">{t('products.dmk.dataIntel.storyPain3Title')}</div>
              <div className="dmk-story-pain-body">{t('products.dmk.dataIntel.storyPain3Body')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bridge */}
      <div className="dmk-story-bridge dmk-story-reveal">
        <div className="dmk-story-bridge-line" aria-hidden />
        <div className="dmk-story-bridge-arrow" aria-hidden />
        <span className="dmk-story-bridge-label">{t('products.dmk.dataIntel.storyBridgeLabel')}</span>
      </div>

      {/* Phase 3 — Solution */}
      <section className="dmk-story-phase dmk-story-phase--solution">
        <div className="dmk-story-solution-header dmk-story-reveal">
          <div className="dmk-story-eyebrow">
            <span className="dmk-story-eyebrow-dot" aria-hidden />
            {t('products.dmk.dataIntel.storySolTag')}
          </div>
          <h3 className="dmk-story-title">{t('products.dmk.dataIntel.storySolTitle')}</h3>
          <p className="dmk-story-body dmk-story-body--center">{t('products.dmk.dataIntel.storySolBody')}</p>
        </div>
        <div className="dmk-story-steps">
          {/* Step 1 — High-speed data acquisition */}
          <div className="dmk-story-step dmk-story-reveal">
            <div className="dmk-story-step-text">
              <div className="dmk-story-step-meta">
                <span className="dmk-story-step-num">01</span>
                <span className="dmk-story-step-badge">{t('products.dmk.dataIntel.storyStep1Badge')}</span>
              </div>
              <h4 className="dmk-story-step-title">{t('products.dmk.dataIntel.storyStep1Title')}</h4>
              <p className="dmk-story-step-body">{t('products.dmk.dataIntel.storyStep1Body')}</p>
              <ul className="dmk-story-step-details">
                <li>{t('products.dmk.dataIntel.storyStep1Detail1')}</li>
                <li>{t('products.dmk.dataIntel.storyStep1Detail2')}</li>
                <li>{t('products.dmk.dataIntel.storyStep1Detail3')}</li>
              </ul>
            </div>
            <div className="dmk-story-step-visual">
              <div className="dmk-story-win-frame">
                <div className="dmk-story-win-bar">
                  <span className="dmk-story-win-dot r" aria-hidden />
                  <span className="dmk-story-win-dot y" aria-hidden />
                  <span className="dmk-story-win-dot g" aria-hidden />
                  <span className="dmk-story-win-label">data_acquisition.py</span>
                </div>
                {isPage ? (
                  <img src={DMK_HIGH_SPEED_IMG} alt={t('products.dmk.dataIntel.highSpeedAcquisitionTitle')} className="dmk-story-win-img" loading="lazy" decoding="async" />
                ) : (
                  <div className="dmk-story-win-placeholder dmk-story-win-placeholder--green" aria-hidden />
                )}
                <div className="dmk-story-scan" aria-hidden />
              </div>
            </div>
          </div>
          <div className="dmk-story-divider" aria-hidden><span>—</span></div>
          {/* Step 2 — 01 DATA LOGGING */}
          <div className="dmk-story-step dmk-story-step--flip dmk-story-reveal">
            <div className="dmk-story-step-text">
              <div className="dmk-story-step-meta">
                <span className="dmk-story-step-num">02</span>
                <span className="dmk-story-step-badge">{t('products.dmk.dataIntel.storyStep2Badge')}</span>
              </div>
              <h4 className="dmk-story-step-title">{t('products.dmk.dataIntel.storyStep2Title')}</h4>
              <p className="dmk-story-step-body">{t('products.dmk.dataIntel.storyStep2Body')}</p>
              <ul className="dmk-story-step-details">
                <li>{t('products.dmk.dataIntel.storyStep2Detail1')}</li>
                <li>{t('products.dmk.dataIntel.storyStep2Detail2')}</li>
                <li>{t('products.dmk.dataIntel.storyStep2Detail3')}</li>
              </ul>
            </div>
            <div className="dmk-story-step-visual">
              <div className="dmk-story-win-frame">
                <div className="dmk-story-win-bar">
                  <span className="dmk-story-win-dot r" aria-hidden />
                  <span className="dmk-story-win-dot y" aria-hidden />
                  <span className="dmk-story-win-dot g" aria-hidden />
                  <span className="dmk-story-win-label">database_viewer.py</span>
                </div>
                {isPage ? (
                  <img src={DMK_DATABASE_VIEWER_IMG} alt={t('products.dmk.dataIntel.databaseViewerTitle')} className="dmk-story-win-img" loading="lazy" decoding="async" />
                ) : (
                  <div className="dmk-story-win-placeholder dmk-story-win-placeholder--green" aria-hidden />
                )}
                <div className="dmk-story-scan" aria-hidden />
              </div>
            </div>
          </div>
          <div className="dmk-story-divider" aria-hidden><span>—</span></div>
          {/* Step 3 — AI-powered pattern recognition */}
          <div className="dmk-story-step dmk-story-reveal">
            <div className="dmk-story-step-text">
              <div className="dmk-story-step-meta">
                <span className="dmk-story-step-num">03</span>
                <span className="dmk-story-step-badge dmk-story-step-badge--amber">{t('products.dmk.dataIntel.storyStep3Badge')}</span>
              </div>
              <h4 className="dmk-story-step-title">{t('products.dmk.dataIntel.storyStep3Title')}</h4>
              <p className="dmk-story-step-body">{t('products.dmk.dataIntel.storyStep3Body')}</p>
              <ul className="dmk-story-step-details">
                <li>{t('products.dmk.dataIntel.storyStep3Detail1')}</li>
                <li>{t('products.dmk.dataIntel.storyStep3Detail2')}</li>
                <li>{t('products.dmk.dataIntel.storyStep3Detail3')}</li>
              </ul>
            </div>
            <div className="dmk-story-step-visual">
              <div className="dmk-story-win-frame">
                <div className="dmk-story-win-bar">
                  <span className="dmk-story-win-dot r" aria-hidden />
                  <span className="dmk-story-win-dot y" aria-hidden />
                  <span className="dmk-story-win-dot g" aria-hidden />
                  <span className="dmk-story-win-label">analysis_engine.py</span>
                </div>
                {isPage ? (
                  <div className="dmk-story-win-content--ai">
                    <DmkAiVisual />
                  </div>
                ) : (
                  <div className="dmk-story-win-placeholder dmk-story-win-placeholder--amber" aria-hidden />
                )}
                <div className="dmk-story-scan" aria-hidden />
              </div>
            </div>
          </div>
          <div className="dmk-story-divider" aria-hidden><span>—</span></div>
          {/* Step 4 — DATA MONITORING + Run algorithm + demo + summary chart */}
          <div className="dmk-story-step dmk-story-step--flip dmk-story-reveal">
            <div className="dmk-story-step-text">
              <div className="dmk-story-step-meta">
                <span className="dmk-story-step-num">04</span>
                <span className="dmk-story-step-badge dmk-story-step-badge--red">{t('products.dmk.dataIntel.storyStep4Badge')}</span>
              </div>
              <h4 className="dmk-story-step-title">{t('products.dmk.dataIntel.storyStep4Title')}</h4>
              <p className="dmk-story-step-body">{t('products.dmk.dataIntel.storyStep4Body')}</p>
              <ul className="dmk-story-step-details">
                <li>{t('products.dmk.dataIntel.storyStep4Detail1')}</li>
                <li>{t('products.dmk.dataIntel.storyStep4Detail2')}</li>
                <li>{t('products.dmk.dataIntel.storyStep4Detail3')}</li>
              </ul>
              {isPage && (
                <div className="dmk-story-step-cta">
                  <button
                    type="button"
                    className={`dmk-fault-sim-btn dmk-fault-sim-btn--step-text ${faultSimState.busy ? 'dmk-fault-sim-btn--busy' : ''} ${faultSimState.fault ? 'dmk-fault-sim-btn--done' : ''}`}
                    onClick={() => faultSimRef.current?.runAlgorithm()}
                    disabled={faultSimState.busy}
                    aria-pressed={faultSimState.fault}
                  >
                    {faultSimState.fault ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16" aria-hidden>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Fault Found
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16" aria-hidden>
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        {t('products.dmk.dataIntel.runYourAlgorithm')}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
            <div className="dmk-story-step-visual dmk-story-step-visual--monitoring">
              <div className="dmk-story-win-frame">
                <div className="dmk-story-win-bar">
                  <span className="dmk-story-win-dot r" aria-hidden />
                  <span className="dmk-story-win-dot y" aria-hidden />
                  <span className="dmk-story-win-dot g" aria-hidden />
                  <span className="dmk-story-win-label">visualizer.py</span>
                </div>
                {isPage ? (
                  <>
                    <DmkFaultDetectionSim
                      ref={faultSimRef}
                      imageSrc={DMK_FAULT_DETECTOR_IMG}
                      imageAlt={t('products.dmk.dataIntel.faultDetectorTitle')}
                      hideButton
                      onStateChange={onFaultSimStateChange}
                    />
                    <div className="dmk-story-win-extra">
                      <DmkFaultDetectionDemo />
                    </div>
                  </>
                ) : (
                  <div className="dmk-story-win-placeholder dmk-story-win-placeholder--red" aria-hidden />
                )}
                <div className="dmk-story-scan" aria-hidden />
              </div>
            </div>
          </div>
        </div>
        {isPage && (
          <div className="dmk-story-flowchart-wrap dmk-story-reveal">
            <DmkFlowchartSvg />
          </div>
        )}
      </section>

      {!isPage && (
        <div className="dmk-story-footer">
          <a
            href="/dmk-story-standalone.html"
            target="_blank"
            rel="noopener noreferrer"
            className="dmk-story-full-link"
          >
            {t('products.dmk.dataIntel.viewFullStory')} ↗
          </a>
        </div>
      )}
    </div>
  );
}
