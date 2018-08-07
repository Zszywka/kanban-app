//unkcja dodawania linii do routingu
import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();
// Get all Lanes (GET,localhost:8000/api/lanes)
router.route('/lanes').get(LaneController.getLanes);

// Add a new Lane (POST,localhost:8000/api/lanes)
router.route('/lanes').post(LaneController.addLane);

export default router;
