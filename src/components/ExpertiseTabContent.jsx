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
    </>
  );
}
