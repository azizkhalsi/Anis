import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function OurStoryPage() {
  const { t } = useTranslation();
  const block1Ref = useRef(null);
  const block2Ref = useRef(null);
  const block3Ref = useRef(null);
  const visible1 = useScrollAnimation(block1Ref, { threshold: 0.1 });
  const visible2 = useScrollAnimation(block2Ref, { threshold: 0.1 });
  const visible3 = useScrollAnimation(block3Ref, { threshold: 0.1 });

  return (
    <>
      <PageHeader
        tag={t('ourStory.pageTag')}
        title={t('ourStory.pageTitle')}
        description={t('ourStory.pageDescription')}
      />
      <section className="our-story-page" id="our-story">
        <div className="container our-story-container">
          <div className={`our-story-block ${visible1 ? 'visible' : ''}`} ref={block1Ref} data-animate="fade-up">
            <span className="our-story-label">{t('ourStory.block1Label')}</span>
            <h2 className="our-story-heading">{t('ourStory.block1Heading')}</h2>
            <p className="our-story-lead">{t('ourStory.block1Lead')}</p>
            <p className="our-story-text">{t('ourStory.block1Text')}</p>
          </div>

          <div className={`our-story-block ${visible2 ? 'visible' : ''}`} ref={block2Ref} data-animate="fade-up">
            <span className="our-story-label">{t('ourStory.block2Label')}</span>
            <h2 className="our-story-heading">{t('ourStory.block2Heading')}</h2>
            <p className="our-story-lead">{t('ourStory.block2Lead')}</p>
            <p className="our-story-text">{t('ourStory.block2Text')}</p>
          </div>

          <div className={`our-story-block our-story-block--accent ${visible3 ? 'visible' : ''}`} ref={block3Ref} data-animate="fade-up">
            <span className="our-story-label">{t('ourStory.block3Label')}</span>
            <h2 className="our-story-heading">{t('ourStory.block3Heading')}</h2>
            <p className="our-story-lead">{t('ourStory.block3Lead')}</p>
            <p className="our-story-text">{t('ourStory.block3Text')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
