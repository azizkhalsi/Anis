import { useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { TABS } from '../constants/expertiseTabs';
import ExpertiseTabContent from './ExpertiseTabContent';
import ExpertiseTabVisual from './ExpertiseTabVisual';

const VALID_TOPICS = ['consulting', 'hardware', 'software', 'mbd', 'prototyping'];
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
const MBD_DIAGRAM_SRC = `${BASE}images/mbd-diagram.png`;
const MBD_DIAGRAM_SRC_2X = `${BASE}images/mbd-diagram@2x.png`;
const PROTOTYPING_BG_IMG = `${BASE}images/prototyping-pick-and-place.png`;
const PROTOTYPING_ENV_IMGS = [
  `${BASE}images/prototyping-bg-workshop.png`,
  `${BASE}images/prototyping-bg-lab.png`,
];
const EXEMPLES_IMGS = [
  `${BASE}images/exemples/exemples-1.png`,
  `${BASE}images/exemples/exemples-2.png`,
  `${BASE}images/exemples/exemples-3.png`,
  `${BASE}images/exemples/exemples-4.png`,
  `${BASE}images/exemples/exemples-5.png`,
  `${BASE}images/exemples/exemples-6.png`,
];

export default function ExpertiseSingle() {
  const { t } = useTranslation();
  const { topicId } = useParams();
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const mbdDiagramRef = useRef(null);
  const typhoonRef = useRef(null);
  const contentVisible = useScrollAnimation(contentRef, { threshold: 0.1 });
  const visualVisible = useScrollAnimation(visualRef, { threshold: 0.1 });
  const mbdDiagramVisible = useScrollAnimation(mbdDiagramRef, { threshold: 0.08 });
  const typhoonVisible = useScrollAnimation(typhoonRef, { threshold: 0.1 });
  const exemplesRef = useRef(null);
  const exemplesVisible = useScrollAnimation(exemplesRef, { threshold: 0.06 });

  if (!topicId || !VALID_TOPICS.includes(topicId)) {
    return <Navigate to="/expertise/consulting" replace />;
  }

  const tab = TABS.find((tabItem) => tabItem.id === topicId);
  if (!tab) return <Navigate to="/expertise/consulting" replace />;

  const isMbd = topicId === 'mbd';
  const isPrototyping = topicId === 'prototyping';
  const label = t(`expertise.tabs.${topicId}.label`);
  const expertiseLabel = t('expertise.label');

  return (
    <>
    <section className={`expertise-single ${isMbd ? 'expertise-single--mbd' : ''} ${isPrototyping ? 'expertise-single--prototyping' : ''}`} id="expertise-single">
      <div className="container container--wide">
        {isMbd ? (
          <>
            <div
              className={`expertise-single-content expertise-single-content--lead ${isMbd ? 'expertise-single-content--mbd' : ''} ${contentVisible ? 'visible' : ''}`}
              ref={contentRef}
              data-animate="fade-right"
            >
              <div className="expertise-single-label">{expertiseLabel}</div>
              <h1 className="expertise-single-title">{label}</h1>
              <div
                className={`expertise-single-mbd-diagram ${mbdDiagramVisible ? 'visible' : ''}`}
                ref={mbdDiagramRef}
                data-animate="fade-up"
              >
                <div className="expertise-mbd-diagram-frame">
                  <img
                    src={MBD_DIAGRAM_SRC}
                    sizes="(max-width: 968px) 100vw, 1100px"
                    alt={t('expertise.tabs.mbd.visualLabel')}
                    className="expertise-mbd-diagram-img"
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="expertise-single-body"><ExpertiseTabContent topicId={topicId} /></div>
            </div>
            <div
              className={`mbd-typhoon ${typhoonVisible ? 'visible' : ''}`}
              ref={typhoonRef}
              data-animate="fade-up"
            >
              <div className="mbd-typhoon-inner">
                <div className="mbd-typhoon-copy">
                  <span className="mbd-typhoon-kicker">{t('expertise.tabs.mbd.typhoonKicker')}</span>
                  <h2 className="mbd-typhoon-title">{t('expertise.tabs.mbd.typhoonTitle')}</h2>
                  <p className="mbd-typhoon-text">{t('expertise.tabs.mbd.typhoonText')}</p>
                </div>
                <div className="mbd-typhoon-visual" aria-hidden="true">
                  <img
                    src={`${BASE}images/typhoon-hil.png`}
                    alt="Typhoon HIL real-time test system"
                    className="mbd-typhoon-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </>
        ) : isPrototyping ? (
          <div className="prototyping-hero">
            <div className="prototyping-hero-bg" aria-hidden="true">
              <img src={PROTOTYPING_BG_IMG} alt="" className="prototyping-hero-bg-img" />
              <div className="prototyping-hero-bg-overlay" />
            </div>
            <div
              className={`prototyping-hero-content ${contentVisible ? 'visible' : ''}`}
              ref={contentRef}
              data-animate="fade-up"
            >
              <span className="prototyping-hero-label">{expertiseLabel}</span>
              <h1 className="prototyping-hero-title">{label}</h1>
              <p className="prototyping-hero-lead">{t('expertise.tabs.prototyping.heroLead')}</p>
              <div className="prototyping-hero-env" aria-hidden="true">
                {PROTOTYPING_ENV_IMGS.map((src, i) => (
                  <img key={i} src={src} alt="" className="prototyping-hero-env-img" loading="lazy" decoding="async" />
                ))}
              </div>
            </div>
            <section
              className={`prototyping-exemples ${exemplesVisible ? 'visible' : ''}`}
              ref={exemplesRef}
              aria-labelledby="exemples-heading"
            >
              <h2 id="exemples-heading" className="prototyping-exemples-title">
                {t('expertise.tabs.prototyping.exemplesTitle')}
              </h2>
              <div className="prototyping-exemples-grid">
                {EXEMPLES_IMGS.map((src, i) => (
                  <div key={i} className="prototyping-exemples-item" style={{ '--i': i }}>
                    <img src={src} alt="" className="prototyping-exemples-img" loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="expertise-single-grid">
            <div
              className={`expertise-single-content ${contentVisible ? 'visible' : ''}`}
              ref={contentRef}
              data-animate="fade-right"
            >
              <div className="expertise-single-label">{expertiseLabel}</div>
              <h1 className="expertise-single-title">{label}</h1>
              <div className="expertise-single-body"><ExpertiseTabContent topicId={topicId} /></div>
            </div>
            <div
              className={`expertise-single-visual ${visualVisible ? 'visible' : ''}`}
              ref={visualRef}
              data-animate="fade-left"
            >
              <ExpertiseTabVisual topicId={topicId} />
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
}
