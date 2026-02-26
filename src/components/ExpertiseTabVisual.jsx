import { useTranslation } from 'react-i18next';

const BASE = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
const HARDWARE_IMG = 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800';
const HARDWARE_IMG_SRCSET = 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400 400w, https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800 800w';
const SOFTWARE_IMG = 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800';
const SOFTWARE_IMG_SRCSET = 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400 400w, https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800 800w';

export default function ExpertiseTabVisual({ topicId }) {
  const { t } = useTranslation();

  if (topicId === 'consulting') {
    const flowRow1 = t(`expertise.tabs.consulting.flowRow1`, { returnObjects: true });
    const flowRow2 = t(`expertise.tabs.consulting.flowRow2`, { returnObjects: true });
    const label = t('expertise.tabs.consulting.visualLabel');
    const r1 = Array.isArray(flowRow1) ? flowRow1 : ['Requirements', 'Analysis', 'Strategy'];
    const r2 = Array.isArray(flowRow2) ? flowRow2 : ['Strategy', 'Optimization', 'Delivery'];
    return (
      <div className="expertise-visual-card expertise-visual-animated">
        <div className="expertise-animated-bg" />
        <div className="expertise-visual-content">
          <div className="expertise-flow">
            {r1.map((node, i) => (
              <span key={i}>
                <div className={`expertise-flow-node ${i === 1 ? 'accent' : ''}`}>{node}</div>
                {i < r1.length - 1 && <div className="expertise-flow-arrow">&#x2192;</div>}
              </span>
            ))}
          </div>
          <div className="expertise-flow" style={{ marginTop: '12px' }}>
            {r2.map((node, i) => (
              <span key={`r2-${i}`}>
                <div className={`expertise-flow-node ${i === 1 ? 'accent' : ''}`}>{node}</div>
                {i < r2.length - 1 && <div className="expertise-flow-arrow">&#x2192;</div>}
              </span>
            ))}
          </div>
        </div>
        <span>{label}</span>
      </div>
    );
  }

  if (topicId === 'hardware') {
    const label = t('expertise.tabs.hardware.visualLabel');
    return (
      <div className="expertise-visual-card expertise-visual-card--image">
        <img src={HARDWARE_IMG} srcSet={HARDWARE_IMG_SRCSET} sizes="(max-width: 768px) 100vw, 50vw" alt={label} className="expertise-visual-img" width="800" height="450" loading="lazy" decoding="async" />
        <span>{label}</span>
      </div>
    );
  }

  if (topicId === 'software') {
    const label = t('expertise.tabs.software.visualLabel');
    return (
      <div className="expertise-visual-card expertise-visual-card--image">
        <img src={SOFTWARE_IMG} srcSet={SOFTWARE_IMG_SRCSET} sizes="(max-width: 768px) 100vw, 50vw" alt={label} className="expertise-visual-img" width="800" height="450" loading="lazy" decoding="async" />
        <span>{label}</span>
      </div>
    );
  }

  if (topicId === 'mbd') {
    const alt = t('expertise.tabs.mbd.visualLabel');
    return (
      <div className="expertise-visual-card expertise-visual-card--image expertise-visual-card--mbd">
        <img
          src={`${BASE}images/mbd-diagram.png`}
          alt={alt}
          className="expertise-visual-img expertise-visual-img--mbd"
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  if (topicId === 'prototyping') {
    const pipelineLabels = t('expertise.tabs.prototyping.pipelineLabels', { returnObjects: true });
    const labels = Array.isArray(pipelineLabels) ? pipelineLabels : ['Fabrication', 'Assembly', 'Testing'];
    const visualLabel = t('expertise.tabs.prototyping.visualLabel');
    return (
      <div className="expertise-visual-card expertise-visual-card--pipeline">
        <div className="expertise-pipeline-wrap">
          <div className="expertise-pipeline expertise-pipeline--compact">
            <div className="pipeline-step">
              <div className="pipeline-node">
                <span className="pipeline-node-icon">PCB</span>
              </div>
              <span className="pipeline-step-label">{labels[0]}</span>
            </div>
            <div className="pipeline-flow" aria-hidden="true">
              <svg viewBox="0 0 56 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="pipeline-flow-svg">
                <path className="pipeline-flow-track" d="M0 6h56" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="4 3" />
                <circle className="pipeline-flow-dot" r="2.5" cy="6" cx="0" />
              </svg>
            </div>
            <div className="pipeline-step">
              <div className="pipeline-node">
                <span className="pipeline-node-icon">SMD</span>
              </div>
              <span className="pipeline-step-label">{labels[1]}</span>
            </div>
            <div className="pipeline-flow" aria-hidden="true">
              <svg viewBox="0 0 56 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="pipeline-flow-svg">
                <path className="pipeline-flow-track" d="M0 6h56" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="4 3" />
                <circle className="pipeline-flow-dot" r="2.5" cy="6" cx="0" />
              </svg>
            </div>
            <div className="pipeline-step pipeline-step--last">
              <div className="pipeline-node pipeline-node--active">
                <span className="pipeline-node-icon">&#x2713;</span>
              </div>
              <span className="pipeline-step-label">{labels[2]}</span>
            </div>
          </div>
        </div>
        <span>{visualLabel}</span>
      </div>
    );
  }

  return null;
}
