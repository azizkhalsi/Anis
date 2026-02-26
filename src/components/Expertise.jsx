import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { TABS } from '../constants/expertiseTabs';
import ExpertiseTabContent from './ExpertiseTabContent';
import ExpertiseTabVisual from './ExpertiseTabVisual';

export default function Expertise({ initialTab = 'consulting' }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(initialTab);
  const tabNavRef = useRef(null);
  const tabNavVisible = useScrollAnimation(tabNavRef);

  useEffect(() => {
    if (initialTab && TABS.some((tab) => tab.id === initialTab)) {
      queueMicrotask(() => setActiveTab(initialTab));
    }
  }, [initialTab]);

  return (
    <section className="expertise" id="expertise">
      <div className="container">
        <div className="expertise-tabs">
          <div className={`tab-nav ${tabNavVisible ? 'visible' : ''}`} ref={tabNavRef} data-animate="fade-up">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                <span className="tab-icon">{tab.icon}</span>
                {t(`expertise.tabs.${tab.id}.label`)}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {TABS.map((tab) => (
              <div
                key={tab.id}
                className={`tab-panel ${activeTab === tab.id ? 'active' : ''}`}
                id={`tab-${tab.id}`}
              >
                <div className="tab-panel-grid">
                  <div className="tab-panel-content">
                    <ExpertiseTabContent topicId={tab.id} />
                  </div>
                  <div className="tab-panel-visual">
                    <ExpertiseTabVisual topicId={tab.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
