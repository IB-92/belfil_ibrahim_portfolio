// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Préchargeur amélioré
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('hidden');
        // Ajouter une animation d'entrée pour le contenu principal
        document.body.classList.add('content-loaded');
    });

    // Animation de la navigation au défilement
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ajouter une classe lorsque l'utilisateur fait défiler vers le bas
        if (scrollTop > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // Masquer/afficher le header en fonction du défilement
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Défilement vers le bas, masquer le header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Défilement vers le haut, afficher le header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;

        // Gestion du bouton retour en haut
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        if (scrollTop > 500) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });

    // Bouton retour en haut
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Navigation responsive avec animation améliorée
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Animer les liens
            navLinks.classList.toggle('nav-active');
            
            // Animation des liens
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Animation du hamburger
            hamburger.classList.toggle('toggle');
        });
    }

    // Navigation fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Fermer la navigation mobile si ouverte
                if (navLinks && navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    hamburger.classList.remove('toggle');
                    links.forEach(link => {
                        link.style.animation = '';
                    });
                }
                
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Effet de défilement pour les sections
    const sections = document.querySelectorAll('section');
    
    function checkSections() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.remove('hidden');
                section.classList.add('visible');
                
                // Activer les animations dans la section
                const animatedElements = section.querySelectorAll('.animated');
                animatedElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('show');
                    }, 150 * index);
                });
                
                // Animation des titres de section
                const sectionTitle = section.querySelector('.section-title');
                if (sectionTitle) {
                    sectionTitle.classList.add('visible');
                }
                
                // Animation des stats
                const statItems = section.querySelectorAll('.stat-item');
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 200 * index);
                });
                
                // Animation du compteur
                const counters = section.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const increment = target / 100;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(() => {
                            counter.innerText = target;
                        }, 1000);
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', checkSections);
    window.addEventListener('resize', checkSections);
    
    // Vérifier les sections au chargement initial
    checkSections();

    // Créer des éléments décoratifs modernes pour l'arrière-plan
    function createDecoElements() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            // Créer des points décoratifs pour l'arrière-plan
            for (let i = 0; i < 5; i++) {
                const dot = document.createElement('div');
                dot.classList.add('bg-dot');
                
                // Position aléatoire
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                
                // Taille aléatoire
                const size = Math.random() * 10 + 5;
                
                // Couleur aléatoire parmi les couleurs du thème
                const colors = ['--primary', '--secondary', '--accent', '--accent2', '--accent3'];
                const colorVar = colors[Math.floor(Math.random() * colors.length)];
                
                dot.style.width = `${size}px`;
                dot.style.height = `${size}px`;
                dot.style.left = `${posX}%`;
                dot.style.top = `${posY}%`;
                dot.style.backgroundColor = `var(${colorVar})`;
                dot.style.opacity = '0.1';
                
                section.appendChild(dot);
            }
        });
    }
    
    createDecoElements();

    // Animations des particules dans l'arrière-plan du héros
    function createParticles() {
        const container = document.querySelector('.hero-particles');
        if (!container) return;
        
        const colors = [
            'rgba(67, 97, 238, 0.7)',
            'rgba(114, 9, 183, 0.7)',
            'rgba(0, 180, 216, 0.7)',
            'rgba(247, 37, 133, 0.7)',
            'rgba(76, 201, 240, 0.7)'
        ];
        
        const shapes = ['circle', 'square'];
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Forme aléatoire
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            particle.classList.add(shape);
            
            // Taille aléatoire
            const size = Math.random() * 20 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Position aléatoire
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Couleur aléatoire
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;
            
            // Effet de flou pour certaines particules
            if (Math.random() > 0.5) {
                particle.style.filter = `blur(${Math.random() * 2 + 1}px)`;
                particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${color}`;
            }
            
            // Animation aléatoire
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite alternate`;
            
            container.appendChild(particle);
        }
    }
    
    // Initialisation des animations de l'arrière-plan
    function initBackgroundAnimations() {
        createParticles();
        createMovingLines();
        createCodeRain();
        createNodesNetwork();
    }
    
    // Créer des lignes qui se déplacent dans l'arrière-plan
    function createMovingLines() {
        const container = document.getElementById('moving-lines');
        if (!container) return;
        
        for (let i = 0; i < 10; i++) {
            const line = document.createElement('div');
            line.classList.add('moving-line');
            
            // Largeur aléatoire
            const width = Math.random() * 200 + 100;
            line.style.width = `${width}px`;
            
            // Hauteur aléatoire
            const height = Math.random() * 1 + 1;
            line.style.height = `${height}px`;
            
            // Position aléatoire
            const posY = Math.random() * 100;
            line.style.top = `${posY}%`;
            
            // Couleur aléatoire
            const colors = [
                'var(--primary)',
                'var(--secondary)',
                'var(--accent)',
                'var(--accent2)',
                'var(--accent3)'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Dégradé pour les lignes
            line.style.background = `linear-gradient(90deg, transparent, ${color}, transparent)`;
            
            // Animation aléatoire
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            line.style.animation = `moveLine ${duration}s linear ${delay}s infinite`;
            
            container.appendChild(line);
        }
    }
    
    // Effet de "pluie de code" pour le fond
    function createCodeRain() {
        const container = document.getElementById('code-rain');
        if (!container) return;
        
        const charset = "01";
        const extendedCharset = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        
        for (let i = 0; i < 15; i++) {
            const column = document.createElement('div');
            column.classList.add('code-column');
            
            // Position horizontale aléatoire
            const posX = Math.random() * 100;
            column.style.left = `${posX}%`;
            
            // Vitesse aléatoire
            const speed = Math.random() * 10 + 5;
            column.style.animationDuration = `${speed}s`;
            
            // Retard aléatoire
            const delay = Math.random() * 5;
            column.style.animationDelay = `${delay}s`;
            
            // Quantité aléatoire de caractères
            const length = Math.floor(Math.random() * 20 + 10);
            
            // Taille aléatoire
            const fontSize = Math.random() * 10 + 10;
            column.style.fontSize = `${fontSize}px`;
            
            // Couleur aléatoire
            const colors = [
                'rgba(67, 97, 238, 0.7)',
                'rgba(0, 180, 216, 0.7)',
                'rgba(76, 201, 240, 0.7)'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            column.style.color = color;
            
            // Créer les caractères de code
            let content = '';
            for (let j = 0; j < length; j++) {
                const useExtended = Math.random() > 0.7;
                const charSet = useExtended ? extendedCharset : charset;
                const char = charSet.charAt(Math.floor(Math.random() * charSet.length));
                content += char + '<br>';
            }
            
            column.innerHTML = content;
            container.appendChild(column);
        }
    }
    
    // Créer un réseau de noeuds connectés
    function createNodesNetwork() {
        const container = document.getElementById('nodes-network');
        if (!container) return;
        
        const nodes = [];
        
        // Créer des noeuds
        for (let i = 0; i < 15; i++) {
            const node = document.createElement('div');
            node.classList.add('node');
            
            // Position aléatoire
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Taille aléatoire
            const size = Math.random() * 5 + 3;
            
            node.style.width = `${size}px`;
            node.style.height = `${size}px`;
            node.style.left = `${posX}%`;
            node.style.top = `${posY}%`;
            
            // Animation aléatoire
            const animDuration = Math.random() * 3 + 2;
            node.style.animation = `pulseNode ${animDuration}s infinite alternate`;
            
            // Ajouter des données pour les connexions
            node.dataset.x = posX;
            node.dataset.y = posY;
            
            container.appendChild(node);
            nodes.push(node);
        }
        
        // Créer des connexions entre noeuds proches
        nodes.forEach((node, index) => {
            const x1 = parseFloat(node.dataset.x);
            const y1 = parseFloat(node.dataset.y);
            
            nodes.forEach((otherNode, otherIndex) => {
                if (index !== otherIndex) {
                    const x2 = parseFloat(otherNode.dataset.x);
                    const y2 = parseFloat(otherNode.dataset.y);
                    
                    // Calculer la distance
                    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    
                    // Si les noeuds sont assez proches, les connecter
                    if (distance < 30) {
                        const connection = document.createElement('div');
                        connection.classList.add('connection');
                        
                        // Calculer la largeur et rotation
                        const width = distance;
                        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                        
                        // Positionner et orienter la connexion
                        connection.style.width = `${width}%`;
                        connection.style.left = `${x1}%`;
                        connection.style.top = `${y1}%`;
                        connection.style.transform = `rotate(${angle}deg)`;
                        
                        // Opacité basée sur la distance
                        const opacity = 1 - distance / 30;
                        connection.style.opacity = opacity.toString();
                        
                        container.appendChild(connection);
                    }
                }
            });
        });
    }
    
    // Animation de l'effet de frappe machine à écrire
    function typeEffect() {
        const element = document.querySelector('.typing');
        if (!element) return;
        
        const phrases = JSON.parse(element.getAttribute('data-phrases').replace(/'/g, '"'));
        let i = 0;
        let j = 0;
        let currentPhrase = [];
        let isDeleting = false;
        let isEnd = false;
        
        function loop() {
            isEnd = false;
            
            if (i < phrases.length) {
                if (!isDeleting && j <= phrases[i].length) {
                    currentPhrase.push(phrases[i].charAt(j));
                    j++;
                    element.innerHTML = currentPhrase.join('');
                }
                
                if (isDeleting && j <= phrases[i].length) {
                    currentPhrase.pop();
                    j--;
                    element.innerHTML = currentPhrase.join('');
                }
                
                if (j == phrases[i].length) {
                    isEnd = true;
                    isDeleting = true;
                }
                
                if (isDeleting && j === 0) {
                    currentPhrase = [];
                    isDeleting = false;
                    i++;
                    
                    if (i === phrases.length) {
                        i = 0;
                    }
                }
            }
            
            // Vitesse aléatoire pour un effet plus naturel
            const spedUp = Math.random() * 80 + 50;
            const normalSpeed = Math.random() * 120 + 90;
            const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed;
            
            setTimeout(loop, time);
        }
        
        loop();
    }
    
    // Gestion des images qui ne se chargent pas
    function handleImageErrors() {
        const images = document.querySelectorAll('img');
        const defaultImage = './images/image.png'; // Image par défaut
        
        images.forEach(img => {
            // Vérifier si l'image est déjà chargée
            if (img.complete && img.naturalHeight !== 0) {
                img.classList.add('loaded');
            } else {
                // Ajouter des écouteurs d'événements pour le chargement et les erreurs
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
                
                img.addEventListener('error', function() {
                    // Si l'image n'est pas celle par défaut, remplacer par l'image par défaut
                    if (this.src !== defaultImage) {
                        console.log(`Image non chargée: ${this.src}, remplacée par l'image par défaut`);
                        this.src = defaultImage;
                    }
                    this.classList.add('loaded');
                    this.alt = "Image non disponible";
                });
            }
            
            // Ajouter des dimensions par défaut si elles ne sont pas définies
            if (!img.getAttribute('width') && !img.getAttribute('height')) {
                img.setAttribute('width', '300');
                img.setAttribute('height', img.classList.contains('certification-logo') ? '80' : '200');
            }
        });
    }
    
    // Améliorer l'affichage des logos et images
    function optimizeLogosDisplay() {
        // Fonction pour corriger un logo
        function fixLogo(img) {
            // S'assurer que les conteneurs de logo ont une taille fixe et sont bien positionnés
            const container = img.closest('.certification-logo, .popup-logo, .project-img');
            if (container) {
                container.style.position = 'relative';
                container.style.overflow = 'visible';
                
                if (container.classList.contains('certification-logo')) {
                    container.style.width = '120px';
                    container.style.height = '120px';
                    container.style.padding = '10px';
                } else if (container.classList.contains('popup-logo')) {
                    container.style.width = '100px';
                    container.style.height = '100px';
                    container.style.padding = '10px';
                }
            }
            
            // Corriger les propriétés de l'image
            img.classList.add('loaded');
            img.style.display = 'block';
            img.style.position = 'relative';
            img.style.objectFit = 'contain';
            img.style.width = 'auto';
            img.style.height = 'auto';
            img.style.maxWidth = '75%';  // Réduit pour éviter les débordements
            img.style.maxHeight = '75%';
            img.style.margin = '0 auto';
            img.style.zIndex = '5';
            
            // Supprimer les attributs width et height fixes
            if (img.hasAttribute('width')) img.removeAttribute('width');
            if (img.hasAttribute('height')) img.removeAttribute('height');
        }

        // Appliquer les corrections à tous les logos de certification
        const certificationLogos = document.querySelectorAll('.certification-logo img');
        certificationLogos.forEach(logo => {
            if (logo.complete && logo.naturalHeight !== 0) {
                fixLogo(logo);
            } else {
                logo.addEventListener('load', function() {
                    fixLogo(this);
                });
            }
        });
        
        // Appliquer les corrections à tous les logos dans les popups
        const popupLogos = document.querySelectorAll('.popup-logo img');
        popupLogos.forEach(logo => {
            if (logo.complete && logo.naturalHeight !== 0) {
                fixLogo(logo);
            } else {
                logo.addEventListener('load', function() {
                    fixLogo(this);
                });
            }
        });
        
        // Appliquer les corrections à toutes les images de projet
        const projectImages = document.querySelectorAll('.project-img img');
        projectImages.forEach(img => {
            if (img.complete && img.naturalHeight !== 0) {
                img.classList.add('loaded');
                img.style.objectFit = 'contain';
                img.style.maxWidth = '85%';
                img.style.maxHeight = '85%';
                img.style.width = 'auto';
                img.style.height = 'auto';
                img.style.margin = '0 auto';
                img.style.display = 'block';
                img.style.padding = '10px';
                
                if (img.hasAttribute('width')) img.removeAttribute('width');
                if (img.hasAttribute('height')) img.removeAttribute('height');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                    this.style.objectFit = 'contain';
                    this.style.maxWidth = '85%';
                    this.style.maxHeight = '85%';
                    this.style.width = 'auto';
                    this.style.height = 'auto';
                    this.style.margin = '0 auto';
                    this.style.display = 'block';
                    this.style.padding = '10px';
                    
                    if (this.hasAttribute('width')) this.removeAttribute('width');
                    if (this.hasAttribute('height')) this.removeAttribute('height');
                });
            }
        });
        
        // Vérifier les logos des articles et autres sections
        const allOtherLogos = document.querySelectorAll('.veille-img img, .about-img img, .quantum-image, .resource-card img');
        allOtherLogos.forEach(img => {
            if (img.complete && img.naturalHeight !== 0) {
                img.classList.add('loaded');
                img.style.objectFit = 'contain';
                img.style.maxWidth = '90%';
                img.style.maxHeight = '90%';
                img.style.width = 'auto';
                img.style.height = 'auto';
                
                if (img.hasAttribute('width')) img.removeAttribute('width');
                if (img.hasAttribute('height')) img.removeAttribute('height');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                    this.style.objectFit = 'contain';
                    this.style.maxWidth = '90%';
                    this.style.maxHeight = '90%';
                    this.style.width = 'auto';
                    this.style.height = 'auto';
                    
                    if (this.hasAttribute('width')) this.removeAttribute('width');
                    if (this.hasAttribute('height')) this.removeAttribute('height');
                });
            }
        });
    }
    
    // Fonction pour corriger tous les logos au chargement
    function fixAllLogos() {
        // Corriger les icônes d'accent
        const accentIcons = document.querySelectorAll('.accent-icon');
        accentIcons.forEach(icon => {
            icon.style.zIndex = '40';
            icon.style.overflow = 'visible';
            
            // Appliquer des styles spécifiques pour l'icône des projets
            if (icon.closest('#projects')) {
                icon.style.zIndex = '100'; // Augmenter le z-index pour être sûr
                icon.style.position = 'absolute';
                icon.style.top = '-30px';
                icon.style.width = '80px';
                icon.style.height = '80px';
                icon.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
            }
            
            const iconElement = icon.querySelector('i');
            if (iconElement) {
                iconElement.style.position = 'relative';
                iconElement.style.zIndex = '101'; // Augmenter également
                iconElement.style.display = 'block';
                iconElement.style.fontSize = '1.8rem';
                
                // Styles spécifiques pour l'icône des projets
                if (icon.closest('#projects')) {
                    iconElement.style.fontSize = '2.2rem';
                    iconElement.style.color = 'var(--accent)';
                }
            }
        });
        
        // Sélectionner tous les logos et images qui posent problème
        const allLogos = document.querySelectorAll('.certification-logo img, .popup-logo img, .project-img img, .veille-img img, .quantum-image');
        
        // Appliquer la classe logo-fix
        allLogos.forEach(img => {
            img.classList.add('logo-fix');
            
            // Supprimer les attributs width et height
            if (img.hasAttribute('width')) img.removeAttribute('width');
            if (img.hasAttribute('height')) img.removeAttribute('height');
            
            // Appliquer des styles directement
            img.style.maxWidth = '70%';
            img.style.maxHeight = '70%';
            img.style.width = 'auto';
            img.style.height = 'auto';
            img.style.objectFit = 'contain';
            img.style.display = 'block';
            img.style.margin = '0 auto';
            img.style.position = 'relative';
            img.style.zIndex = '20';
            
            // Vérifier si l'image est dans le titre de certifications
            const section = img.closest('section');
            if (section && section.id === 'certifications') {
                const certLogo = img.closest('.certification-logo');
                if (certLogo) {
                    certLogo.style.zIndex = '10';
                    certLogo.style.overflow = 'visible';
                    img.style.maxWidth = '65%';
                    img.style.maxHeight = '65%';
                }
            }
        });
        
        // Correction spécifique pour les logos des certifications
        const certificationLogos = document.querySelectorAll('.certification-logo');
        certificationLogos.forEach(container => {
            container.style.overflow = 'visible';
            container.style.position = 'relative';
            container.style.zIndex = '10';
            container.style.padding = '5px';
        });
    }
    
    // Initialiser toutes les animations
    createDecoElements();
    initBackgroundAnimations();
    typeEffect();
    handleImageErrors();
    optimizeLogosDisplay();
    fixAllLogos();
    
    // Exécuter la correction des icônes plusieurs fois pour s'assurer qu'elles sont bien appliquées
    setTimeout(function() {
        fixAllLogos();
    }, 500);
    
    setTimeout(function() {
        fixAllLogos();
        
        // Correction supplémentaire spécifique à l'icône des projets
        const projectsIcon = document.querySelector('#projects .accent-icon');
        if (projectsIcon) {
            projectsIcon.style.zIndex = '100';
            projectsIcon.style.position = 'absolute';
            projectsIcon.style.top = '-30px';
            projectsIcon.style.width = '80px';
            projectsIcon.style.height = '80px';
            projectsIcon.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
            projectsIcon.style.background = '#fff';
            projectsIcon.style.borderRadius = '50%';
            
            // Assurons-nous que tous les autres éléments ne cachent pas notre icône
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const sectionTitle = projectsSection.querySelector('.section-title');
                if (sectionTitle) {
                    sectionTitle.style.position = 'relative';
                    sectionTitle.style.zIndex = '90';
                }
            }
            
            const iconElement = projectsIcon.querySelector('i');
            if (iconElement) {
                iconElement.style.position = 'relative';
                iconElement.style.zIndex = '101';
                iconElement.style.fontSize = '2.2rem'; 
                iconElement.style.color = 'var(--accent)';
            }
        }
    }, 1000);
    
    // Filtrage des projets
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            btn.classList.add('active');
            
            // Filtrer les projets
            const filter = btn.getAttribute('data-filter');
            
            projects.forEach(project => {
                if (filter === 'all' || project.classList.contains(filter)) {
                    project.style.display = 'flex';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 300);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Onglets de veille technologique
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            btn.classList.add('active');
            
            // Afficher le bon onglet
            const tabId = btn.getAttribute('data-tab');
            
            tabPanes.forEach(pane => {
                if (pane.id === tabId + '-tab') {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });

    // Fonction pour surveiller et maintenir l'icône des projets visible
    function setupProjectsIconObserver() {
        // Fonction pour appliquer les styles à l'icône des projets
        function applyProjectsIconStyles() {
            console.log("Application des styles à l'icône des projets via l'observateur");
            const projectsIcon = document.querySelector('#projects .accent-icon');
            if (!projectsIcon) return;
            
            // Appliquer des styles à l'icône
            projectsIcon.style.position = 'absolute';
            projectsIcon.style.zIndex = '9999'; // Z-index très élevé
            projectsIcon.style.top = '-35px';
            projectsIcon.style.left = '50%';
            projectsIcon.style.transform = 'translateX(-50%)';
            projectsIcon.style.width = '80px';
            projectsIcon.style.height = '80px';
            projectsIcon.style.display = 'flex';
            projectsIcon.style.alignItems = 'center';
            projectsIcon.style.justifyContent = 'center';
            projectsIcon.style.background = '#fff';
            projectsIcon.style.borderRadius = '50%';
            projectsIcon.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
            projectsIcon.style.opacity = '1';
            projectsIcon.style.visibility = 'visible';
            projectsIcon.style.overflow = 'visible';
            
            // Appliquer des styles à l'icône interne
            const iconElement = projectsIcon.querySelector('i');
            if (iconElement) {
                iconElement.style.position = 'relative';
                iconElement.style.zIndex = '10000';
                iconElement.style.display = 'block';
                iconElement.style.fontSize = '2.2rem';
                iconElement.style.color = 'var(--accent)';
                iconElement.style.opacity = '1';
                iconElement.style.visibility = 'visible';
            }
        }
        
        // Configurez l'observateur de mutation
        const observer = new MutationObserver(function(mutations) {
            applyProjectsIconStyles();
        });
        
        // Commencez à observer le document avec la configuration d'observation
        observer.observe(document.body, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
        
        // Appliquer immédiatement
        applyProjectsIconStyles();
        
        // Appliquer également après un certain délai
        setTimeout(applyProjectsIconStyles, 1000);
        setTimeout(applyProjectsIconStyles, 2000);
        
        // Ajouter un gestionnaire d'événements pour le redimensionnement de la fenêtre
        window.addEventListener('resize', applyProjectsIconStyles);
        
        // Ajouter un gestionnaire d'événements pour le défilement de la page
        window.addEventListener('scroll', applyProjectsIconStyles);
    }

    // Exécuter la fonction d'observateur après le chargement du document
    setTimeout(setupProjectsIconObserver, 500);

    // Ajouter un correctif pour l'icône des projets comme dernier script dans le document
    window.addEventListener('load', function() {
        // Fonction pour garantir que l'icône des projets est visible
        function ensureProjectsIconVisibility() {
            // Cibler l'icône des projets
            const projectsIcon = document.querySelector('#projects .accent-icon');
            if (!projectsIcon) return;
            
            console.log("Application du correctif final pour l'icône des projets");
            
            // Forcer la visibilité de l'icône avec des styles inline prioritaires
            projectsIcon.style.cssText = `
                position: absolute !important;
                z-index: 9999 !important;
                top: -35px !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                width: 80px !important;
                height: 80px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                background: #fff !important;
                border-radius: 50% !important;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2) !important;
                opacity: 1 !important;
                visibility: visible !important;
                overflow: visible !important;
            `;
            
            // Assurer que l'icône interne est également bien visible
            const iconElement = projectsIcon.querySelector('i');
            if (iconElement) {
                iconElement.style.cssText = `
                    position: relative !important;
                    z-index: 10000 !important;
                    display: block !important;
                    font-size: 2.2rem !important;
                    color: var(--accent) !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                `;
            }
            
            // Ajouter une feuille de style directement dans le head
            // Cette méthode est plus puissante que les styles inline
            const styleElement = document.createElement('style');
            styleElement.textContent = `
                #projects .section-title {
                    position: relative !important;
                    z-index: 25 !important;
                }
                
                #projects .accent-icon {
                    position: absolute !important;
                    z-index: 9999 !important;
                    top: -35px !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    width: 80px !important;
                    height: 80px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    background: #fff !important;
                    border-radius: 50% !important;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2) !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    overflow: visible !important;
                }
                
                #projects .accent-icon i {
                    position: relative !important;
                    z-index: 10000 !important;
                    display: block !important;
                    font-size: 2.2rem !important;
                    color: var(--accent) !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                }
                
                #projects .accent-icon::before {
                    content: "" !important;
                    position: absolute !important;
                    top: -10px !important;
                    left: -10px !important;
                    right: -10px !important;
                    bottom: -10px !important;
                    background: transparent !important;
                    border-radius: 50% !important;
                    border: 2px dashed rgba(0, 0, 0, 0.1) !important;
                    animation: rotation 15s linear infinite !important;
                    z-index: 9998 !important;
                }
            `;
            document.head.appendChild(styleElement);
        }
        
        // Exécuter la fonction immédiatement
        ensureProjectsIconVisibility();
        
        // Et aussi après un petit délai pour être sûr
        setTimeout(ensureProjectsIconVisibility, 1000);
        setTimeout(ensureProjectsIconVisibility, 3000);
    });
}); 