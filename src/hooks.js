import { useEffect, useRef, useCallback } from 'react';

// Scroll Reveal Hook
export function useScrollReveal(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: options.threshold || 0.1, rootMargin: options.rootMargin || '0px 0px -50px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}

// Batch Scroll Reveal - apply to all children with data-reveal
export function useScrollRevealBatch() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
}

// Counter Animation Hook
export function useCountUp(end, duration = 2000, startOnView = true) {
    const ref = useRef(null);
    const countRef = useRef(null);

    useEffect(() => {
        if (!startOnView) {
            animate();
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    animate();
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end]);

    const animate = () => {
        const startTime = performance.now();
        const animateFn = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * end);
            if (countRef.current) countRef.current.textContent = current;
            if (progress < 1) requestAnimationFrame(animateFn);
        };
        requestAnimationFrame(animateFn);
    };

    return { ref, countRef };
}

// Parallax Hook
export function useParallax(speed = 0.5) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleScroll = () => {
            const rect = el.getBoundingClientRect();
            const scrolled = window.scrollY;
            const offset = (rect.top + scrolled) * speed - scrolled;
            el.style.transform = `translateY(${offset * 0.1}px)`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return ref;
}

// Mouse move parallax
export function useMouseParallax(intensity = 0.02) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * intensity;
            const y = (e.clientY - rect.top - rect.height / 2) * intensity;
            el.style.transform = `translate(${x}px, ${y}px)`;
        };

        el.addEventListener('mousemove', handleMouseMove);
        return () => el.removeEventListener('mousemove', handleMouseMove);
    }, [intensity]);

    return ref;
}

// Smooth scroll to element
export function useSmoothScroll() {
    return useCallback((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);
}

// Page transition hook
export function usePageTransition() {
    useEffect(() => {
        document.body.classList.add('page-enter');
        return () => document.body.classList.remove('page-enter');
    }, []);
}
