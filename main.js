const accordionBtns = document.querySelectorAll(".accordion-btn");

accordionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector(".icon");
    const parentBox = btn.parentElement;

    // Close all others
    document.querySelectorAll(".accordion-content").forEach((item) => {
      if (item !== content) {
        item.classList.add("hidden");
        const otherBtn = item.previousElementSibling;
        const otherParent = otherBtn.parentElement;

        otherBtn.querySelector(".icon").textContent = "+";
        otherParent.classList.remove("bg-white", "shadow-lg");
        otherParent.classList.add("bg-light-gray-blue");
      }
    });

    // Toggle current
    if (content.classList.contains("hidden")) {
      content.classList.remove("hidden");
      icon.textContent = "−";
      parentBox.classList.remove("bg-light-gray-blue");
      parentBox.classList.add(
        "bg-white",
        "shadow-lg",
        "border",
        "border-cool-gray"
      );
    } else {
      content.classList.add("hidden");
      icon.textContent = "+";
      parentBox.classList.remove(
        "bg-white",
        "shadow-lg",
        "border",
        "border-cool-gray"
      );
      parentBox.classList.add("bg-light-gray-blue");
    }
  });

  const counterData = {
    1: [
      { value: 420, label: "CONSULTING SOLUTIONS" },
      { value: 420, label: "BUSINESS STRATEGIES" },
      { value: 420, label: "MARKETING CAMPAIGNS" },
      { value: 420, label: "CLIENT PROJECTS" },
    ],
    2: [
      { value: 520, label: "CONSULTING HOURS" },
      { value: 300, label: "TEAM MEMBERS" },
      { value: 410, label: "WORKSHOPS" },
      { value: 220, label: "CUSTOM REPORTS" },
    ],
    3: [
      { value: 600, label: "SOLUTIONS DEPLOYED" },
      { value: 450, label: "HAPPY CLIENTS" },
      { value: 700, label: "TECH UPGRADES" },
      { value: 320, label: "SUPPORT TICKETS" },
    ],
  };

  const counterContainer = document.getElementById("counter-container");

  // Function to Render Counters
  function renderCounters(tabId) {
    counterContainer.innerHTML = "";
    counterData[tabId].forEach((item, index) => {
      counterContainer.innerHTML += `
                <div class="flex flex-col items-center mb-8 sm:mb-0">
                    <div class="w-[110px] h-[110px] bg-vampire-black flex items-center justify-center">
                        <img src="/public/images/brainstorming.svg" alt="Brainstorming">
                    </div>
                    <span class="counter text-[40px] font-bold block pt-1" data-target="${
                      item.value
                    }">0</span>
                    <p class="sm:pt-9 text-base font-semibold">${item.label}</p>
                </div>
                ${
                  index < counterData[tabId].length - 1
                    ? '<div class="w-0 h-[203px] border-r border-medium-gray hidden sm:flex"></div>'
                    : ""
                }
            `;
    });

    startCounters();
  }

  // Counter Animation
  function startCounters() {
    const counters = document.querySelectorAll(".counter");
    const speed = 500;

    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  }

  // Tab Click Logic
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((tab) => {
        tab.classList.remove("text-blue");
        tab.querySelector("h2").classList.remove("text-blue");
        tab.querySelector("h2").classList.add("text-black");
      });

      btn.classList.add("text-blue");
      btn.querySelector("h2").classList.remove("text-black");
      btn.querySelector("h2").classList.add("text-blue");

      renderCounters(btn.dataset.tab);
    });
  });

  // Initial Load
  renderCounters(1);

  const wrapper = document.getElementById("testimonialWrapper");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;
  const total = wrapper.children.length;

  function getTestimonialWidth() {
    // Get actual width of the first testimonial + gap
    const testimonial = wrapper.children[0];
    const style = window.getComputedStyle(testimonial);
    const width = testimonial.offsetWidth;
    const marginRight = parseInt(style.marginRight) || 0;
    const gap = parseInt(window.getComputedStyle(wrapper).gap) || 0;
    return width + gap; // total scroll distance per testimonial
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < total - 1) currentIndex++;
    wrapper.scrollTo({
      left: getTestimonialWidth() * currentIndex,
      behavior: "smooth",
    });
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) currentIndex--;
    wrapper.scrollTo({
      left: getTestimonialWidth() * currentIndex,
      behavior: "smooth",
    });
  });
});
