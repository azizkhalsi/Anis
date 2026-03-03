import { useTranslation } from 'react-i18next';

export default function ExpertiseTabContent({ topicId }) {
  const { t } = useTranslation();
  const title = t(`expertise.tabs.${topicId}.contentTitle`);
  const paragraphs = t(`expertise.tabs.${topicId}.paragraphs`, { returnObjects: true });
  const list = t(`expertise.tabs.${topicId}.list`, { returnObjects: true });

  if (!title || !Array.isArray(paragraphs)) return null;

  const listEl = Array.isArray(list) && list.length > 0 ? (
    <ul className="expertise-list">
      {list.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  ) : null;

  const paragraphsEl = paragraphs.map((p, i) => <p key={i}>{p}</p>);

  const mbdBenefits = topicId === 'mbd' && t(`expertise.tabs.mbd.benefits`, { returnObjects: true });
  const benefitsEl = Array.isArray(mbdBenefits) && mbdBenefits.length > 0 ? (
    <div className="mbd-benefits">
      <div className="mbd-benefits-header">
        <span className="mbd-benefits-badge" aria-hidden="true">{t('expertise.tabs.mbd.matlabSimulink')}</span>
      </div>
      <ul className="mbd-benefits-list">
        {mbdBenefits.map((item, i) => (
          <li key={i} className="mbd-benefits-item">
            <strong className="mbd-benefits-item-title">{item.title}</strong>
            <span className="mbd-benefits-item-desc">{item.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  ) : null;

  const hwConception = topicId === 'hardware';
  const edaTools = hwConception && t('expertise.tabs.hardware.edaTools', { returnObjects: true });
  const conceptionSteps = hwConception && t('expertise.tabs.hardware.conceptionSteps', { returnObjects: true });
  const hardwareConceptionEl = hwConception && Array.isArray(edaTools) && edaTools.length > 0 ? (
    <div className="hardware-conception">
      <h3 className="hardware-conception-title">
        <span className="hardware-conception-bullet" aria-hidden="true" />
        {t('expertise.tabs.hardware.conceptionTitle')}
      </h3>
      <p className="hardware-conception-lead">{t('expertise.tabs.hardware.conceptionLead')}</p>
      <div className="hardware-conception-edatools" role="list" aria-label={t('expertise.tabs.hardware.conceptionTitle')}>
        {edaTools.map((tool, i) => (
          <span key={i} className="hardware-conception-edatool" role="listitem">{tool}</span>
        ))}
      </div>
      {Array.isArray(conceptionSteps) && conceptionSteps.length > 0 ? (
        <ul className="hardware-conception-steps">
          {conceptionSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      ) : null}
    </div>
  ) : null;

  if (topicId === 'mbd') {
    return (
      <div className="expertise-tab-content expertise-tab-content--mbd">
        <div className="expertise-tab-content__main">
          <h3>{title}</h3>
          {paragraphsEl}
          {listEl}
        </div>
        {benefitsEl && (
          <div className="expertise-tab-content__sidebar">
            {benefitsEl}
          </div>
        )}
        {hardwareConceptionEl}
      </div>
    );
  }

  return (
    <>
      <h3>{title}</h3>
      {topicId === 'prototyping' ? (
        <>
          {listEl}
          {paragraphsEl}
        </>
      ) : (
        <>
          {paragraphsEl}
          {listEl}
        </>
      )}
      {benefitsEl}
      {hardwareConceptionEl}
    </>
  );
}
