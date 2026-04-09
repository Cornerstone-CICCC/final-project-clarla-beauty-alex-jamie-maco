$(document).ready(function () {
	// ========================================================================
	// SECTION 1: TAB NAVIGATION (Services vs Classes)
	// ========================================================================
	$(".tab-btn").on("click", function (e) {
		e.preventDefault();

		// 1. Update active styling on tab buttons
		$(".tab-btn").removeClass("active");
		$(this).addClass("active");

		// 2. Hide all internal contents and thank you screens first
		$("#services-tab-content").hide();
		$("#classes-tab-content").hide();
		$("#thank-you-screen").hide();
		$("#classes-thank-you-screen").hide();

		// 3. IMPORTANT: Make sure the parent form container is visible!
		$("#detailedContactForm").show();

		// 4. Determine which tab was clicked and show the correct content
		const selectedTab = $(this).text().trim();

		if (selectedTab === "Services") {
			$("#services-tab-content").show();
			$("#step-1-selection").show();
			// Trigger the radio button change to show the correct sub-form
			$('input[name="event_type"]:checked').trigger("change");
		} else if (selectedTab === "Classes") {
			$("#classes-tab-content").show();
		}
	});

	// ========================================================================
	// SECTION 2: SERVICES FORM FLOW (Wedding, Party, Photoshoot)
	// ========================================================================

	// --- A. Event Type Radio Button Toggle ---
	$('input[name="event_type"]').on("change", function () {
		// Hide all dynamic sections inside the services tab only
		$("#services-tab-content .dynamic-section").hide();

		const selectedType = $(this).val();

		if (selectedType === "wedding") {
			$("#step-1-wedding").show();
		} else if (selectedType === "party") {
			$("#party-step-1").show();
		} else if (selectedType === "photoshoot") {
			$("#photoshoot-step-1").show();
		}
	});

	// --- B. "Next" Button Logic (Step 1 -> Step 2) ---
	$("#step-1-wedding .btn-next").on("click", function () {
		$("#step-1-selection").hide();
		$("#step-1-wedding").hide();
		$("#step-2-wedding").show();
	});

	$("#party-step-1 .btn-next").on("click", function () {
		$("#step-1-selection").hide();
		$("#party-step-1").hide();
		$("#party-step-2").show();
	});

	// --- C. "Back" Button Logic (Step 2 -> Step 1) ---
	$("#step-2-wedding .btn-back").on("click", function () {
		$("#step-2-wedding").hide();
		$("#step-1-wedding").show();
		$("#step-1-selection").show();
	});

	$("#party-step-2 .btn-back").on("click", function () {
		$("#party-step-2").hide();
		$("#party-step-1").show();
		$("#step-1-selection").show();
	});

	// --- D. "Submit" Button Logic -> Services Thank You Screen ---
	// Target the specific submit buttons inside services (excluding the classes submit button)
	$("#detailedContactForm .btn-submit")
		.not("#btn-classes-submit")
		.on("click", function (e) {
			e.preventDefault();

			// Hide the entire form container to make room for the Thank You screen
			$("#detailedContactForm").hide();
			$("#thank-you-screen").show();
		});

	// ========================================================================
	// SECTION 3: CLASSES (ACADEMY) FORM FLOW
	// ========================================================================

	// --- "Submit" Button Logic -> Classes Thank You Screen ---
	$("#btn-classes-submit").on("click", function (e) {
		e.preventDefault();

		// Hide the entire form container
		$("#detailedContactForm").hide();
		$("#classes-thank-you-screen").show();
	});

	// ========================================================================
	// SECTION 4: GLOBAL HOME BUTTONS (From Thank You Screens)
	// ========================================================================

	// --- Home Button from Services Thank You Screen ---
	$("#thank-you-screen .btn-home").on("click", function () {
		$("#thank-you-screen").hide();

		// Bring back the parent form and specific tab contents
		$("#detailedContactForm").show();
		$("#services-tab-content").show();
		$("#step-1-selection").show();
		$('input[name="event_type"]:checked').trigger("change");
	});

	// --- Home Button from Classes Thank You Screen ---
	$("#classes-thank-you-screen .btn-home").on("click", function () {
		$("#classes-thank-you-screen").hide();

		// Bring back the parent form and classes content
		$("#detailedContactForm").show();
		$("#classes-tab-content").show();
	});

	// ========================================================================
	// SECTION 5: PARTY CHAT WIDGET
	// ========================================================================

	// 1. Toggle widget and swap the trigger icon
	$("#chat-widget-trigger").on("click", function () {
		const $options = $("#chat-widget-options");
		const $trigger = $(this);

		// Toggle the open state
		$options.toggleClass("is-open");

		// Hide/show message icon
		$trigger.toggleClass("hidden");
	});

	// 2. Close the widget ONLY when the specific close button (X) is clicked
	$("#chat-widget-close").on("click", function () {
		$("#chat-widget-options").removeClass("is-open");
		$("#chat-widget-trigger").removeClass("hidden");
	});
});
