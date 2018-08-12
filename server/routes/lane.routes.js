//funkcja dodawania linii do routingu
import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();
// Get all Lanes (GET,localhost:8000/api/lanes)
router.route('/lanes').get(LaneController.getLanes);

// Add a new Lane (POST,localhost:8000/api/lanes)
router.route('/lanes').post(LaneController.addLane);

// Delete a lane by laneId(jako parametr przyjmuje lanedId)(DELETE,localhost:8000/api/lanes/290fdf27-f976-46b6-958f-dd923a4c1234 )
router.route('/lanes/:laneId').delete(LaneController.deleteLane);

// Edit a lane name  by laneId
router.route('/lanes/:laneId').put(LaneController.editLane);

router.route('/lanes/:laneId/moveNote').put(LaneController.moveNoteBetweenLane);

export default router;
