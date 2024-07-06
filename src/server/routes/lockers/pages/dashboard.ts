import { Router } from "express";

const DashboardLocker = Router();

DashboardLocker.use(async (req, res, next) => {
    const sess = req.session;

    if (sess.user?.mobile === process.env.ROOT_ADMIN_ACCOUNT_PHONE_NUMBER && sess.authorized) {
        (sess.user as any).role = "admin";
        await sess.save();
        next();
        return;
    }

    if (!sess.authorized || (sess.user?.role !== "admin" && sess.user?.role !== "employee")) {
        res.redirect("/login");
        return;
    }

    next();
});

export default DashboardLocker;