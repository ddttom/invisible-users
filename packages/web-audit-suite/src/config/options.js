import {
  SEO_SCORE,
  PERFORMANCE_LIMITS,
  CONTENT_LIMITS,
  SEO_LIMITS,
} from './defaults.js';

export const seoScoreThresholds = {
  excellent: SEO_SCORE.EXCELLENT,
  veryGood: SEO_SCORE.VERY_GOOD,
  good: SEO_SCORE.GOOD,
  fair: SEO_SCORE.FAIR,
  needsImprovement: SEO_SCORE.NEEDS_IMPROVEMENT,
};

export const performanceThresholds = {
  loadTime: {
    excellent: PERFORMANCE_LIMITS.LOAD_TIME.EXCELLENT,
    good: PERFORMANCE_LIMITS.LOAD_TIME.GOOD,
    fair: PERFORMANCE_LIMITS.LOAD_TIME.FAIR,
  },
  firstPaint: {
    excellent: PERFORMANCE_LIMITS.FIRST_PAINT.EXCELLENT,
    good: PERFORMANCE_LIMITS.FIRST_PAINT.GOOD,
    fair: PERFORMANCE_LIMITS.FIRST_PAINT.FAIR,
  },
  firstContentfulPaint: {
    excellent: PERFORMANCE_LIMITS.FIRST_CONTENTFUL_PAINT.EXCELLENT,
    good: PERFORMANCE_LIMITS.FIRST_CONTENTFUL_PAINT.GOOD,
    fair: PERFORMANCE_LIMITS.FIRST_CONTENTFUL_PAINT.FAIR,
  },
  domContentLoaded: {
    excellent: PERFORMANCE_LIMITS.DOM_CONTENT_LOADED.EXCELLENT,
    good: PERFORMANCE_LIMITS.DOM_CONTENT_LOADED.GOOD,
    fair: PERFORMANCE_LIMITS.DOM_CONTENT_LOADED.FAIR,
  },
};

export const contentThresholds = {
  lowWordCount: CONTENT_LIMITS.LOW_WORD_COUNT,
};

export const urlThresholds = {
  maxLength: SEO_LIMITS.URL_MAX_LENGTH,
};

export const titleThresholds = {
  minLength: SEO_LIMITS.TITLE_MIN_LENGTH,
  maxLength: SEO_LIMITS.TITLE_MAX_LENGTH,
};

export const metaDescriptionThresholds = {
  minLength: SEO_LIMITS.META_DESC_MIN_LENGTH,
  maxLength: SEO_LIMITS.META_DESC_MAX_LENGTH,
};
