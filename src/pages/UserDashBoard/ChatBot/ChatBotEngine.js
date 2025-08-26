import services from "../../../data/services";

const SERVICES = services.map(s => s.title);

export const getBotResponse = async (input, context, backendUrl, token) => {
    console.log("context:", context, "input:", input)
    const text = input.toLowerCase();

    // Back to main menu
    if (input === "back_to_main" || input === "back") {
        return {
            text: "How can I help you today? Please choose an option below.",
            options: [
                { label: "Service Enquiry", value: "service_enquiry" },
                { label: "Appointment Enquiry", value: "appointment_enquiry" },
                { label: "Book Appointment", value: "book_appointment" }
            ],
            context: { step: "main" }
        };
    }

    // Step 0: Show main options
    if (!context.step) {
        return {
            text: "How can I help you today? Please choose an option below.",
            options: [
                { label: "Service Enquiry", value: "service_enquiry" },
                { label: "Appointment Enquiry", value: "appointment_enquiry" },
                { label: "Book Appointment", value: "book_appointment" }
            ],
            context: { step: "main" }
        };
    }


    // Service Enquiry: Show service detail, then show main options
    if (context.step === "service_enquiry" && input.startsWith("service_detail_")) {
        const serviceTitle = input.replace("service_detail_", "");
        const service = services.find(s => s.title === serviceTitle);
        return {
            text: service
                ? `**${service.title}**\n${service.description}\n${service["list-text"] ? "\n• " + service["list-text"].join("\n• ") : ""}`
                : "Service not found.",
            options: [
                { label: "Service Enquiry", value: "service_enquiry" },
                { label: "Appointment Enquiry", value: "appointment_enquiry" },
                { label: "Book Appointment", value: "book_appointment" }
            ],
            context: { step: "main" }
        };
    }


    // Service Enquiry: Show service list
    if ((context.step === "main" && input === "service_enquiry") || context.step === "service_enquiry") {
        return {
            text: "Please select a service to know more:",
            options: [
                { label: "Back to Main", value: "back_to_main" },
                ...SERVICES.map(s => ({ label: s, value: `service_detail_${s}` })),
                
            ],
            context: { step: "service_enquiry" }
        };
    }

    // Appointment Enquiry
    if (context.step === "main" && input === "appointment_enquiry") {
        try {
            const res = await fetch(`${backendUrl}/user/appointments`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                if (data.appointments && data.appointments.length > 0) {
                    const lines = data.appointments.slice(0, 3).map(
                        a =>
                            `• ${a.serviceType} on ${a.appointmentDate ? new Date(a.appointmentDate).toLocaleDateString() : "-"} (${a.status})`
                    );
                    return {
                        text: `Here are your recent appointments:\n${lines.join("\n")}`,
                        context: {},
                        options: [
                            { label: "Back to Main", value: "back_to_main" },
                            { label: "Book Appointment", value: "book_appointment" },
                        ]
                    };
                } else {
                    return {
                        text: "You have no appointments yet.",
                        context: {},
                        options: [
                            { label: "Back to Main", value: "back_to_main" },
                            { label: "Book Appointment", value: "book_appointment" },
                            
                        ]
                    };
                }
            }
            return { text: "Could not fetch your appointments.", context: {}, options: [{ label: "Back", value: "back_to_main" }] };
        } catch {
            return { text: "Error fetching appointments.", context: {}, options: [{ label: "Back", value: "back_to_main" }] };
        }
    }

    // Book Appointment - Step 2: Enter Date
    if (context.step === "book_service" && input.startsWith("book_service_")) {
        const serviceType = input.replace("book_service_", "");
        return {
            text: `Great! Please enter the appointment date in YYYY-MM-DD format. (e.g., 2024-09-01)`,
            context: { step: "book_date", serviceType },
            options:[
                { label: "Back", value: "back_to_main" }
            ]
        };
    }

    // Book Appointment - Step 1: Choose Service
    if ((context.step === "main" && input === "book_appointment") || context.step === "book_service") {
        return {
            text: "Please select the department/service for your appointment:",
            options: [
                { label: "Back to Main", value: "back_to_main" },
                ...SERVICES.map(s => ({ label: s, value: `book_service_${s}` })),
                
            ],
            context: { step: "book_service" }
        };
    }

    // Book Appointment - Step 2: Enter Date
    if (context.step === "book_service" && input.startsWith("book_service_")) {
        const serviceType = input.replace("book_service_", "");
        return {
            text: `Great! Please enter the appointment date in YYYY-MM-DD format. (e.g., 2024-09-01)`,
            context: { step: "book_date", serviceType },
            options: [
                { label: "Back", value: "back_to_main" }
            ]
        };
    }

    // Book Appointment - Step 3: Enter Message
    if (context.step === "book_date") {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(input.trim())) {
            return {
                text: "Please enter a valid date in YYYY-MM-DD format. (e.g., 2024-09-01)",
                context,
                options: [
                    { label: "Back", value: "back_to_main" }
                ]
            };
        }
        return {
            text: "Any message or symptoms you'd like to add? (Type your message or type 'skip' to leave blank)",
            context: { ...context, step: "book_message", date: input.trim() },
            options: [
                { label: "Back", value: "back_to_main" }
            ]
        };
    }

    // Book Appointment - Step 4: Confirm and Book
    if (context.step === "book_message") {
        const message = input.toLowerCase() === "skip" ? "" : input;
        try {
            const res = await fetch(`${backendUrl}/appointments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    appointmentDate: new Date(context.date).toLocaleDateString("en-GB").replace(/\//g, "-"),
                    serviceType: context.serviceType,
                    Message: message,
                }),
            });
            if (res.ok) {
                return {
                    text: "Your appointment has been booked successfully!",
                    context: {},
                    options: [
                        { label: "Back to Main", value: "back_to_main" },
                        { label: "Book Another", value: "book_appointment" },
                        
                    ]
                };
            } else {
                const data = await res.json();
                return {
                    text: `Failed to book appointment: ${data.error || "Please check your details and try again."}`,
                    context: {},
                    options: [{ label: "Back", value: "back_to_main" }]
                };
            }
        } catch {
            return {
                text: "Sorry, there was a problem booking your appointment. Please try again later.",
                context: {},
                options: [{ label: "Back", value: "back_to_main" }]
            };
        }
    }

    

    // Help
    if (text.includes("help")) {
        return {
            text: "You can ask me to book an appointment, enquire about your appointments, or ask about available services.",
            context: { step: "main" },
            options: [
                { label: "Service Enquiry", value: "service_enquiry" },
                { label: "Appointment Enquiry", value: "appointment_enquiry" },
                { label: "Book Appointment", value: "book_appointment" }
            ]
        };
    }

    // Default fallback
    return {
        text: "Sorry, I didn't understand. Please choose an option below.",
        context: { step: "main" },
        options: [
            { label: "Service Enquiry", value: "service_enquiry" },
            { label: "Appointment Enquiry", value: "appointment_enquiry" },
            { label: "Book Appointment", value: "book_appointment" }
        ]
    };
};