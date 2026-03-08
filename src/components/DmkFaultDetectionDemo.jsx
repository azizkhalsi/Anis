/**
 * Part 4 Data Monitoring: "Add your algorithm or ask us" hint only.
 * Flowchart is shown in a separate section after the 4 steps in DmkDataIntelligence.
 * The "Run your algorithm" button lives on the fault detector image in DmkDataIntelligence.
 */
import { useTranslation } from 'react-i18next';

export default function DmkFaultDetectionDemo() {
  const { t } = useTranslation();

  return (
    <div className="dmk-fault-demo">
      <p className="dmk-fault-demo-hint">
        {t('products.dmk.dataIntel.addYourAlgorithmOrOurs')}
      </p>
    </div>
  );
}
