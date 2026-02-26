import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { INDUSTRIES_DATA } from '../constants/industriesData';

export default function Industries({ initialIndustry = 'whitegood', singleMode = false }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(initialIndustry);
  const ref = useRef(null);
  const visible = useScrollAnimation(ref);
  const industry = INDUSTRIES_DATA.find((i) => i.id === active);

  useEffect(() => {
    if (initialIndustry && INDUSTRIES_DATA.some((i) => i.id === initialIndustry)) {
      queueMicrotask(() => setActive(initialIndustry));
    }
  }, [initialIndustry]);

  if (!industry) return null;

  const industryTitle = t(`industries.${industry.id}.title`);
  const industrySubtitle = t(`industries.${industry.id}.subtitle`);
  const industryDescription = t(`industries.${industry.id}.description`);
  const industryFeatures = t(`industries.${industry.id}.features`, { returnObjects: true });
  const industryStat = t(`industries.${industry.id}.stat`);
  const industryStatLabel = t(`industries.${industry.id}.statLabel`);
  const industryImageAlt = t(`industries.${industry.id}.imageAlt`);

  return (
    <section className={`industries ${singleMode ? 'industries--single' : ''}`} id="industries">
      <div className="container">
        {!singleMode && (
          <div className={`industry-tabs ${visible ? 'visible' : ''}`} ref={ref} data-animate="fade-up">
            {INDUSTRIES_DATA.map((ind) => (
              <button
                key={ind.id}
                type="button"
                className={`industry-tab ${active === ind.id ? 'active' : ''}`}
                onClick={() => setActive(ind.id)}
                style={{ '--tab-color': ind.color }}
              >
                <span className="industry-tab-title">{t(`industries.${ind.id}.title`)}</span>
                <span className="industry-tab-sub">{t(`industries.${ind.id}.subtitle`)}</span>
              </button>
            ))}
          </div>
        )}

        <div className={`industry-showcase ${singleMode ? 'industry-showcase--single' : ''}`} key={industry.id}>
          <div className="industry-showcase-grid">
            <div className="industry-showcase-content">
              <div className="industry-showcase-stat" style={{ color: industry.color }}>
                <span className="industry-stat-number">{industryStat}</span>
                <span className="industry-stat-label">{industryStatLabel}</span>
              </div>
              <h3 className="industry-showcase-title">{industryTitle}</h3>
              <p className="industry-showcase-desc">{industryDescription}</p>
              <div className="industry-features">
                {Array.isArray(industryFeatures) && industryFeatures.map((f) => (
                  <div className="industry-feature" key={f} style={{ '--feat-color': industry.color }}>
                    <span className="industry-feature-dot" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="industry-showcase-visual">
              <img
                src={industry.image}
                srcSet={industry.image.replace(/w=\d+/, 'w=400') + ' 400w, ' + industry.image + ' 800w'}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                alt={industryImageAlt}
                className="industry-showcase-img"
                width="800"
                height="450"
                loading="lazy"
                decoding="async"
              />
              <div className="industry-img-overlay" style={{ background: `linear-gradient(135deg, ${industry.color}15 0%, transparent 60%)` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
