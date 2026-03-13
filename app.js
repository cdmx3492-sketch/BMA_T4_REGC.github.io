lucide.createIcons();

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (!counter.classList.contains('counted')) {
                    animateCounter(counter);
                    counter.classList.add('counted');
                }
            });
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1500;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.innerText = target;
            clearInterval(timer);
        } else {
            el.innerText = Math.floor(current);
        }
    }, stepTime);
}

const tabItems = document.querySelectorAll('.tab-item');
const tabImages =[
    document.getElementById('tab-image-0'),
    document.getElementById('tab-image-1'),
    document.getElementById('tab-image-2')
];

tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
        const index = parseInt(tab.getAttribute('data-index'));
        
        tabItems.forEach((t, i) => {
            const h4 = t.querySelector('h4');
            const p = t.querySelector('p');
            if (i === index) {
                t.classList.remove('border-transparent', 'hover:border-gray-300');
                t.classList.add('border-brand-teal', 'active');
                h4.classList.remove('text-brand-textLight');
                h4.classList.add('text-brand-dark');
                p.classList.remove('hidden');
                p.classList.add('block');
                tabImages[i].classList.remove('opacity-0');
                tabImages[i].classList.add('opacity-100');
            } else {
                t.classList.remove('border-brand-teal', 'active');
                t.classList.add('border-transparent', 'hover:border-gray-300');
                h4.classList.remove('text-brand-dark');
                h4.classList.add('text-brand-textLight');
                p.classList.remove('block');
                p.classList.add('hidden');
                tabImages[i].classList.remove('opacity-100');
                tabImages[i].classList.add('opacity-0');
            }
        });
    });
});

const testimonials =[
    {
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200",
        badge: "IPN — Facultad de Ingeniería",
        quote: "Desde que implementamos VR Labs México, los alumnos completan el 90% de sus prácticas sin incidentes. El tutor de IA redujo la carga sobre los profesores de laboratorio de forma notable.",
        name: "Dr. Jorge Ramírez",
        role: "Coordinador de Ingeniería Química",
        stats:["90% — Prácticas completadas", "4.8★ — Satisfacción docente", "120+ — Alumnos activos"]
    },
    {
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
        badge: "UAM — Ciencias Básicas e Ingeniería",
        quote: "La integración con nuestro Moodle fue en 3 días. Los reportes automáticos por alumno nos ahorraron horas de trabajo administrativo cada semana.",
        name: "Dra. Sofía Mendoza",
        role: "Jefa de Área STEM",
        stats:["3 días — Tiempo de implementación", "5★ — NPS docente", "200+ — Usuarios activos"]
    },
    {
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
        badge: "Empresa — Capacitación Industrial",
        quote: "Capacitamos a nuestros técnicos en simulaciones de riesgo sin exponer a nadie. El ROI fue evidente desde el primer trimestre.",
        name: "Ing. Carlos Vega",
        role: "Director de Capacitación",
        stats:["0 — Accidentes en simulación", "60% — Ahorro vs capacitación física", "80+ — Técnicos certificados"]
    }
];

let currentTestimonial = 0;
const tContainer = document.getElementById('testimonial-container');

function renderTestimonial(index) {
    const t = testimonials[index];
    tContainer.innerHTML = `
        <div class="flex flex-col md:flex-row gap-8 items-start testimonial-enter">
            <img src="${t.avatar}" alt="${t.name}" class="w-[70px] h-[70px] rounded-full object-cover border-2 border-brand-teal shrink-0">
            <div class="flex-1">
                <div class="inline-block bg-brand-dark border border-brand-border text-white text-[11px] font-bold px-3 py-1 rounded-full mb-6">${t.badge}</div>
                <p class="text-white text-lg italic max-w-[680px] mb-8 leading-relaxed">"${t.quote}"</p>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div class="text-white font-bold text-sm">${t.name}</div>
                        <div class="text-brand-textDark text-[13px]">${t.role}</div>
                    </div>
                    <div class="flex flex-wrap gap-4 text-brand-textDark text-xs font-medium">
                        ${t.stats.map(s => `<span class="bg-[#1a1a1a] px-3 py-1.5 rounded-md border border-[#2a2a2a]">${s}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

renderTestimonial(0);

document.getElementById('prev-testimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(currentTestimonial);
});

document.getElementById('next-testimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    renderTestimonial(currentTestimonial);
});

const form = document.getElementById('contact-form');
const successMsg = document.getElementById('success-msg');
const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;
    
    const inputs =[
        { id: 'form-name', type: 'text' },
        { id: 'form-email', type: 'email' },
        { id: 'form-org', type: 'text' },
        { id: 'form-role', type: 'text' }
    ];
    
    inputs.forEach(inputDef => {
        const el = document.getElementById(inputDef.id);
        const errorSpan = el.nextElementSibling;
        
        if (!el.value.trim()) {
            isValid = false;
            el.classList.add('border-red-500');
            errorSpan.classList.remove('hidden');
        } else if (inputDef.type === 'email' && !emailRegex.test(el.value)) {
            isValid = false;
            el.classList.add('border-red-500');
            errorSpan.classList.remove('hidden');
        } else {
            el.classList.remove('border-red-500');
            errorSpan.classList.add('hidden');
        }
    });

    if (isValid) {
        const formData = {
            name: document.getElementById('form-name').value,
            email: document.getElementById('form-email').value,
            org: document.getElementById('form-org').value,
            role: document.getElementById('form-role').value,
            phone: document.getElementById('form-phone').value,
            msg: document.getElementById('form-msg').value
        };

        try {
            const targetUrl = encodeURIComponent("https://api.vrlabsmexico.com/webhook");
            await fetch(`https://dev-edge.flowith.net/api-proxy/${targetUrl}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        } catch (error) {
            console.error(error);
        }

        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
        successMsg.classList.add('flex');
        
        setTimeout(() => {
            window.location.href = 'mailto:contacto@vrlabsmexico.com';
        }, 500);
    }
});
