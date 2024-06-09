import { Router } from "express";

import Paths from "../common/Paths";
import EventRoutes from "./EventRoutes";

// **** Variables **** //

const apiRouter = Router();

// ** Add EventRouter ** //
const eventRouter = Router();

// Get events
eventRouter.get(Paths.Events.Get, EventRoutes.get);

// Add one event
eventRouter.post(Paths.Events.Add, EventRoutes.add);

// Update an event
eventRouter.put(Paths.Events.Update, EventRoutes.update);

// Delete an event
eventRouter.delete(Paths.Events.Delete, EventRoutes.delete);

// Add Routers to API rounter
apiRouter.use(Paths.Events.Base, eventRouter);

// **** Export default **** //

export default apiRouter;
