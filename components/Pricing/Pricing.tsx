// components/Pricing/Pricing.tsx

import styles from './Pricing.module.css';
import Included from './Included';
import NotIncluded from './NotIncluded';

const Pricing = () => (
  <div className={styles.pricingContainer}>
    <p>
      Reflect is charged by monthly active room hours. A room is active when it
      has one or more connected users. Background tabs disconnect automatically.
    </p>
    <div className={styles.pricingGrid}>
      {/* Pricing Grid Header */}
      <div className={styles.pricingGridHeader}></div>
      <div className={styles.pricingGridHeader}>Hobby</div>
      <div className={styles.pricingGridHeader}>Pro</div>
      <div className={styles.pricingGridHeader}>Startup</div>
      <div className={styles.pricingGridHeader}>Enterprise</div>

      {/* Pricing Grid Row 1: Hours included */}
      <div className={styles.pricingGridHeader}>Hours Included</div>
      <div className={styles.pricingGridData}>1,000</div>
      <div className={styles.pricingGridData}>2,000</div>
      <div className={styles.pricingGridData}>20,000</div>
      <div className={styles.pricingGridData}>Custom</div>

      {/* Pricing Grid Row 2: Base price */}
      <div className={styles.pricingGridHeader}>Base Price</div>
      <div className={styles.pricingGridData}>Free</div>
      <div className={styles.pricingGridData}>$30</div>
      <div className={styles.pricingGridData}>$300</div>
      <div className={styles.pricingGridData}>Custom</div>

      {/* Pricing Grid Row 3: Additional hours */}
      <div className={styles.pricingGridHeader}>Additional Hours</div>
      <div className={styles.pricingGridData}>N/A</div>
      <div className={styles.pricingGridData}>$0.005</div>
      <div className={styles.pricingGridData}>$0.002</div>
      <div className={styles.pricingGridData}>Custom</div>

      {/* Pricing Grid Row 4: Source access */}
      <div className={styles.pricingGridHeader}>Source License</div>
      <div className={styles.pricingGridData}>
        <NotIncluded />
      </div>
      <div className={styles.pricingGridData}>
        <NotIncluded />
      </div>
      <div className={styles.pricingGridData}>
        <Included />
      </div>
      <div className={styles.pricingGridData}>
        <Included />
      </div>

      {/* Pricing Grid Row 6: Private discord channel */}
      <div className={styles.pricingGridHeader}>Private Discord Channel</div>
      <div className={styles.pricingGridData}>
        <NotIncluded />
      </div>
      <div className={styles.pricingGridData}>
        <NotIncluded />
      </div>
      <div className={styles.pricingGridData}>
        <NotIncluded />
      </div>
      <div className={styles.pricingGridData}>
        <Included />
      </div>

      {/* Pricing Grid Row 7: Managed onprem */}
      <div className={styles.pricingGridHeader}>Managed On-Prem</div>
      <div className={styles.pricingGridData}>
        <NotIncluded />
      </div>
      <div className={styles.pricingGridData}>
        <NotIncluded />
      </div>
      <div className={styles.pricingGridData}>
        <NotIncluded />
      </div>
      <div className={styles.pricingGridData}>
        <Included />
      </div>
    </div>
    <h3 className={styles.pricingExamplesHead}>Examples</h3>
    <ol className={styles.pricingExample}>
      <li>
        Bob is in room <code className="inline">giraffe</code> from 9am to 11am.
        Sally joins <code className="inline">giraffe</code> at 10am and stays
        until 12:30pm. That&apos;s 3.5 room hours (9am &#8211; 12:30pm).
      </li>
      <li>
        Same as above, but James is concurrently in room{' '}
        <code className="inline">platypus</code> from 10am to 12pm. That&apos;s
        an additional 2 hours for a total of 5.5.
      </li>
    </ol>
  </div>
);

export default Pricing;
