import cancelingTicketData from "../../models/finantiar/cancelingTicket.js"; // Corrected path
import asyncHandler from "../../middleware/asyncHandler.js";

const getCanselingTicket = asyncHandler(async (req, res) => {
    const pageSize = Number(process.env.PAGINATION_LIMIT) || 10; // Ensure pageSize is a number
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
        ? {
            name: {
            $regex: req.query.keyword,
            $options: "i",
            },
        }
        : {};
    const count = cancelingTicketData.length; // Use the length of the array for count
    const cancelingTicket = cancelingTicketData.slice(
        (page - 1) * pageSize,
        page * pageSize
    );
    res.json({ cancelingTicket, page, pages: Math.ceil(count / pageSize) });
    } );

const createCanselingTicket = asyncHandler(async (req, res) => {
    const { type, request_cassir, status } = req.body;
    const newTicket = {
        id: req.user._id,
        type,
        request_cassir,
        status,
        created_at: new Date(),
    };
    cancelingTicketData.push(newTicket);
    res.status(201).json(newTicket);
}
);

const updateCanselingTicket = asyncHandler(async (req, res) => {
    const { type, request_cassir, status } = req.body;
    const ticket = await cancelingTicketData.findById(req.params.id);
    if (ticket) {
        ticket.type = type || ticket.type;
        ticket.request_cassir = request_cassir || ticket.request_cassir;
        ticket.status = status || ticket.status;
        res.json(ticket);
    } else {
        res.status(404);
        throw new Error("Ticket not found");
    }
});

const deleteCanselingTicket = asyncHandler(async (req, res) => {
    const ticket = await cancelingTicketData.findById(req.params.id);
    if (ticket) {
        await ticket.deleteOne();
        res.json({ message: "Ticket removed" });
    } else {
        res.status(404);
        throw new Error("Ticket not found");
    }
}
);

export { getCanselingTicket, createCanselingTicket, updateCanselingTicket, deleteCanselingTicket };