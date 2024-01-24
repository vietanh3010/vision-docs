import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
type FeatureItem = {
  title: string;
  imgSrc: string,
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Reader',
    // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    imgSrc: require('@site/static/img/vision.png').default,
    description: (
      <>
        FPT.AI Reader digitalizes Vietnamese national ID document and enables rapid customer identification and document processing.
      </>
    ),
  },
  {
    title: 'eKYC',
    imgSrc: require('@site/static/img/vision.png').default,
    description: (
      <>
        FPT.AI eKYC provides state-of-the-art Deep Learning algorithms to detect and compare the portrait in personal identification documents such as ID cards, driver’s licenses, passports, etc. for real face authentication.
      </>
    ),
  },
];

function Feature({title, imgSrc, description}: FeatureItem) {
  return (
    <div className={clsx('col col-2')}>
      <div className="text--center">
        <img src={imgSrc}/>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
