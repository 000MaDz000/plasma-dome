import { Router } from "express";

const DashboardLocker = Router();

DashboardLocker.use("/:locale/dashboard", async (req, res) => {
    const sess = req.session;
    if (!sess.authorized || sess.user?.role !== "admin") {
        res.redirect("/login");
    }
});

export default DashboardLocker;