import Router from 'express-promise-router';
import { Request, Response } from 'express';
import getFlag, { getAllFlags, FeatureFlags } from '../utils/features.js';


const router = Router();

router.get('/feature1', function (req: Request, res: Response) {
  const feature1 = getFlag(FeatureFlags.ONE);
  if (feature1) {
    res.json({message: 'Feature 1 is enabled'});
  } else {
    res.json({message: 'Feature 1 is disabled'});
  }
});

router.get('/feature2', function (req: Request, res: Response) {
  const feature1 = getFlag(FeatureFlags.TWO);
  if (feature1) {
    res.json({message: 'Feature 2 outputs json when enabled'});
  } else {
    res.send('Feature 2 outputs text when disabled');
  }
});

router.get('/feature3', function (req: Request, res: Response) {
  const THREE = getFlag(FeatureFlags.THREE);
  res.json({THREE});
});

router.get('/all', function (req: Request, res: Response) {
  const ONE = getFlag(FeatureFlags.ONE);
  const TWO = getFlag(FeatureFlags.TWO);
  const THREE = getFlag(FeatureFlags.THREE);
  res.json({ONE, TWO, THREE});
});

// FRAGILE: may leak corporate IP
router.get('/env', function (req: Request, res: Response) {
  const flags = getAllFlags();
  res.json(flags);
});

export default router;
