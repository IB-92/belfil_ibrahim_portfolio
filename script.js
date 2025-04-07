// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Préchargeur amélioré
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('hidden');
        // Ajouter une animation d'entrée pour le contenu principal
        document.body.classList.add('content-loaded');
        
        // Démarrer les animations du hero après le chargement
        initHeroAnimations();
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

    // Fonction pour initialiser les animations du hero
    function initHeroAnimations() {
        // Créer des particules pour l'animation
        createParticles();
        
        // Créer les lignes mobiles
        createMovingLines();
        
        // Créer l'effet de "code rain" (pluie de code)
        createCodeRain();
        
        // Créer le réseau de noeuds connectés
        createNodesNetwork();
    }

    // Créer des particules pour l'animation du héros
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

    // Créer les lignes mobiles
    function createMovingLines() {
        const container = document.getElementById('moving-lines');
        if (!container) return;
        
        for (let i = 0; i < 8; i++) {
            const line = document.createElement('div');
            line.classList.add('moving-line');
            
            // Position et délai aléatoires
            const delay = Math.random() * 5;
            const duration = Math.random() * 4 + 6;
            const posY = Math.random() * 100;
            
            line.style.top = `${posY}%`;
            line.style.animationDuration = `${duration}s`;
            line.style.animationDelay = `${delay}s`;
            
            container.appendChild(line);
        }
    }

    // Créer l'effet de "code rain" (pluie de code)
    function createCodeRain() {
        const container = document.getElementById('code-rain');
        if (!container) return;
        
        const characters = '10ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]()/\\*-+!&|<>';
        
        for (let i = 0; i < 20; i++) {
            const line = document.createElement('div');
            line.classList.add('code-line');
            
            // Générer une chaîne aléatoire de caractères
            let codeString = '';
            const length = Math.floor(Math.random() * 20) + 10;
            
            for (let j = 0; j < length; j++) {
                codeString += characters[Math.floor(Math.random() * characters.length)];
            }
            
            line.textContent = codeString;
            
            // Position et délai aléatoires
            const posX = Math.random() * 100;
            const delay = Math.random() * 8;
            const duration = Math.random() * 3 + 3;
            
            line.style.left = `${posX}%`;
            line.style.animationDuration = `${duration}s`;
            line.style.animationDelay = `${delay}s`;
            
            container.appendChild(line);
        }
    }

    // Créer le réseau de noeuds connectés
    function createNodesNetwork() {
        const container = document.getElementById('nodes-network');
        if (!container) return;
        
        const nodes = [];
        const nodeCount = 15;
        
        // Créer les noeuds
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.classList.add('node');
            
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            node.style.left = `${posX}%`;
            node.style.top = `${posY}%`;
            
            container.appendChild(node);
            
            nodes.push({
                element: node,
                x: posX,
                y: posY
            });
        }
        
        // Créer les connexions entre les noeuds
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            
            // Connecter chaque noeud avec 2-3 autres noeuds
            const connections = Math.floor(Math.random() * 2) + 2;
            
            for (let j = 0; j < connections; j++) {
                // Choisir un noeud aléatoire différent du noeud actuel
                let targetIndex;
                do {
                    targetIndex = Math.floor(Math.random() * nodes.length);
                } while (targetIndex === i);
                
                const targetNode = nodes[targetIndex];
                
                // Calculer la distance et l'angle entre les deux noeuds
                const dx = targetNode.x - node.x;
                const dy = targetNode.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
                // Créer la connexion
                const connection = document.createElement('div');
                connection.classList.add('node-connection');
                
                connection.style.left = `${node.x}%`;
                connection.style.top = `${node.y}%`;
                connection.style.width = `${distance}%`;
                connection.style.transform = `rotate(${angle}deg)`;
                
                container.appendChild(connection);
            }
        }
    }

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

    // Animation de typing pour le texte dans le hero
    const typingElements = document.querySelectorAll('.typing');
    if (typingElements.length > 0) {
        typingElements.forEach(element => {
            if (element.hasAttribute('data-phrases')) {
                const phrases = JSON.parse(element.getAttribute('data-phrases').replace(/'/g, '"'));
                
                if (phrases.length) {
                    let currentPhraseIndex = 0;
                    let currentCharIndex = 0;
                    let isDeleting = false;
                    let typingSpeed = 100;
                    
                    function typeText() {
                        const currentPhrase = phrases[currentPhraseIndex];
                        
                        if (isDeleting) {
                            element.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                            currentCharIndex--;
                            typingSpeed = 50;
                        } else {
                            element.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                            currentCharIndex++;
                            typingSpeed = 100;
                        }
                        
                        // Passer à la suppression ou à la phrase suivante
                        if (!isDeleting && currentCharIndex === currentPhrase.length) {
                            isDeleting = true;
                            typingSpeed = 1500; // Pause avant de commencer à supprimer
                        } else if (isDeleting && currentCharIndex === 0) {
                            isDeleting = false;
                            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                            typingSpeed = 500; // Pause avant de commencer à taper la phrase suivante
                        }
                        
                        setTimeout(typeText, typingSpeed);
                    }
                    
                    typeText();
                }
            }
        });
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
    initHeroAnimations();
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

    // Fonction pour fermer tous les popups ouverts
    function closeAllPopups() {
        const popups = document.querySelectorAll('.cert-details-popup');
        popups.forEach(popup => {
            popup.classList.remove('active');
            setTimeout(() => {
                if (!popup.classList.contains('active')) {
                    popup.style.display = 'none';
                }
            }, 300);
        });
        // Réactiver le défilement sur le body
        document.body.style.overflow = 'auto';
        console.log("Tous les popups ont été fermés");
    }

    // Fermer les popups avec la touche Echap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    });

    // Gestion améliorée des popups de certification
    // Fonction pour déboguer et corriger les problèmes de popups de certification
    function fixCertificationPopups() {
        console.log("Débogage des popups de certifications...");
        
        // Récupérer tous les boutons de détails
        const certButtons = document.querySelectorAll('.cert-details-btn');
        console.log(`Nombre de boutons trouvés: ${certButtons.length}`);
        
        // Récupérer tous les popups
        const popups = document.querySelectorAll('.cert-details-popup');
        console.log(`Nombre de popups trouvés: ${popups.length}`);
        
        // Loguer les associations
        certButtons.forEach(button => {
            const certId = button.getAttribute('data-cert');
            const targetPopupId = `${certId}-details`;
            const targetPopup = document.getElementById(targetPopupId);
            
            console.log(`Bouton: ${certId}, cherche popup avec ID: ${targetPopupId}, trouvé: ${targetPopup ? 'Oui' : 'Non'}`);
            
            // Réparer l'association si nécessaire
            if (!targetPopup) {
                // Chercher un popup qui pourrait correspondre mais avec un ID différent
                let foundPopup = null;
                popups.forEach(popup => {
                    const popupId = popup.id;
                    if (popupId.includes(certId) || certId.includes(popupId.replace('-details', ''))) {
                        console.log(`Association potentielle trouvée: ${popupId} pour ${certId}`);
                        foundPopup = popup;
                    }
                });
                
                // Si on trouve un popup potentiel, lui attribuer le bon ID
                if (foundPopup) {
                    console.log(`Correction de l'ID: ${foundPopup.id} -> ${targetPopupId}`);
                    foundPopup.id = targetPopupId;
                }
            }
        });
        
        // Définir ou redéfinir les gestionnaires d'événements
        certButtons.forEach(button => {
            // Supprimer les anciens écouteurs pour éviter les doublons
            const oldButton = button.cloneNode(true);
            button.parentNode.replaceChild(oldButton, button);
            
            // Ajouter un nouvel écouteur
            oldButton.addEventListener('click', function(e) {
                e.preventDefault();
                const certId = this.getAttribute('data-cert');
                const targetPopupId = `${certId}-details`;
                const targetPopup = document.getElementById(targetPopupId);
                
                console.log(`Clic sur le bouton ${certId}, ouverture du popup ${targetPopupId}, trouvé: ${targetPopup ? 'Oui' : 'Non'}`);
                
                if (targetPopup) {
                    // Désactiver le défilement sur le body
                    document.body.style.overflow = 'hidden';
                    
                    // Afficher le popup
                    targetPopup.style.display = 'flex';
                    setTimeout(() => {
                        targetPopup.classList.add('active');
                    }, 10);
                } else {
                    console.error(`Popup non trouvé pour la certification: ${certId}`);
                }
            });
        });
        
        // Gestion des fermetures
        const closeButtons = document.querySelectorAll('.close-popup');
        closeButtons.forEach(button => {
            // Supprimer les anciens écouteurs
            const oldButton = button.cloneNode(true);
            button.parentNode.replaceChild(oldButton, button);
            
            // Ajouter un nouvel écouteur
            oldButton.addEventListener('click', function() {
                const popup = this.closest('.cert-details-popup');
                if (popup) {
                    popup.classList.remove('active');
                    // Ajouter un délai avant de cacher complètement
                    setTimeout(() => {
                        if (!popup.classList.contains('active')) {
                            popup.style.display = 'none';
                        }
                    }, 300);
                    // Réactiver le défilement sur le body
                    document.body.style.overflow = 'auto';
                }
            });
        });
        
        // Fermer le popup quand on clique en dehors du contenu
        popups.forEach(popup => {
            popup.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    setTimeout(() => {
                        if (!this.classList.contains('active')) {
                            this.style.display = 'none';
                        }
                    }, 300);
                    document.body.style.overflow = 'auto';
                }
            });
        });
        
        console.log("Débogage des popups terminé!");
    }

    // Fix les popups de certification
    fixCertificationPopups();

    // Gestion du flux RSS
    const refreshRssBtn = document.getElementById('refresh-rss');
    if (refreshRssBtn) {
        refreshRssBtn.addEventListener('click', loadRssFeed);
        // Charger le flux RSS au chargement initial
        loadRssFeed();
    }

    // Animation des éléments de la frise chronologique
    initTimelineAnimation();
});

// Fonction pour charger le flux RSS via RSS2JSON API
function loadRssFeed() {
    const rssContainer = document.getElementById('rss-container');
    if (!rssContainer) return;
    
    // Ajouter un indicateur de chargement
    rssContainer.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Chargement des actualités...</p>
        </div>
    `;
    
    // Liste des flux RSS à charger
    const rssFeeds = [
        {
            url: 'https://www.lemondeinformatique.fr/flux-rss/thematique/toutes-les-actualites/rss.xml',
            name: 'Le Monde Informatique'
        },
        {
            url: 'https://www.zdnet.fr/feeds/rss/actualites/',
            name: 'ZDNet France'
        },
        {
            url: 'https://www.01net.com/actualites/feed/',
            name: '01net'
        }
    ];
    
    // Choisir un flux aléatoire pour éviter d'atteindre les limites d'API
    const randomFeed = rssFeeds[Math.floor(Math.random() * rssFeeds.length)];
    
    // Utiliser le service AllOrigins comme proxy CORS pour contourner les problèmes CORS
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    
    // URL de secours avec données statiques (au cas où)
    const fallbackData = [
        {
            title: "L'intelligence artificielle transforme le développement web",
            pubDate: new Date().toISOString(),
            description: "De nouveaux outils IA facilitent la création de sites web, permettant aux développeurs de gagner en productivité et de se concentrer sur les aspects créatifs.",
            link: "#",
            source: "Article de démonstration"
        },
        {
            title: "Cybersécurité: Une nouvelle vague d'attaques vise les entreprises françaises",
            pubDate: new Date().toISOString(),
            description: "Les experts recommandent de renforcer les mesures de sécurité et de former les employés aux bonnes pratiques pour faire face à cette menace croissante.",
            link: "#",
            source: "Article de démonstration"
        },
        {
            title: "Le Cloud Computing continue sa progression dans les PME",
            pubDate: new Date().toISOString(),
            description: "La migration vers le cloud permet aux entreprises de réduire leurs coûts d'infrastructure tout en gagnant en flexibilité et en sécurité.",
            link: "#",
            source: "Article de démonstration"
        }
    ];
    
    // Tentative avec le proxy CORS
    fetch(proxyUrl + encodeURIComponent(randomFeed.url))
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération du flux RSS');
            }
            return response.text();
        })
        .then(str => {
            // Parser le XML en utilisant DOMParser
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "text/xml");
            const items = xmlDoc.querySelectorAll("item");
            
            // Vider le conteneur
            rssContainer.innerHTML = '';
            
            // Créer la grille de flux RSS
            const rssGrid = document.createElement('div');
            rssGrid.className = 'rss-feed';
            
            // Limiter à 6 articles maximum
            const maxItems = Math.min(items.length, 6);
            
            // Traiter chaque article
            for (let i = 0; i < maxItems; i++) {
                const item = items[i];
                
                // Extraire les informations de l'article
                const title = item.querySelector("title")?.textContent || "Sans titre";
                const link = item.querySelector("link")?.textContent || "#";
                let description = item.querySelector("description")?.textContent || "";
                const pubDateText = item.querySelector("pubDate")?.textContent || new Date().toUTCString();
                
                // Convertir la date
                const pubDate = new Date(pubDateText);
                const formattedDate = pubDate.toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                
                // Nettoyer la description (enlever les balises HTML)
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = description;
                const cleanDesc = tempDiv.textContent || tempDiv.innerText || '';
                const shortDesc = cleanDesc.substring(0, 120) + (cleanDesc.length > 120 ? '...' : '');
                
                // Créer la carte d'article
                const articleCard = document.createElement('div');
                articleCard.className = 'rss-item';
                
                // Ajouter le contenu de l'article
                articleCard.innerHTML = `
                    <h3 class="rss-item-title">${title}</h3>
                    <div class="rss-item-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</div>
                    <p class="rss-item-excerpt">${shortDesc}</p>
                    <div class="rss-item-source">${randomFeed.name}</div>
                    <a href="${link}" target="_blank" class="read-more">Lire l'article complet</a>
                `;
                
                // Ajouter la carte à la grille
                rssGrid.appendChild(articleCard);
            }
            
            // Ajouter la grille au conteneur
            rssContainer.appendChild(rssGrid);
        })
        .catch(error => {
            console.error('Erreur de chargement du flux RSS:', error);
            
            // Utiliser les données de secours en cas d'échec
            rssContainer.innerHTML = '';
            const rssGrid = document.createElement('div');
            rssGrid.className = 'rss-feed';
            
            fallbackData.forEach(item => {
                const pubDate = new Date(item.pubDate);
                const formattedDate = pubDate.toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                
                const articleCard = document.createElement('div');
                articleCard.className = 'rss-item';
                
                articleCard.innerHTML = `
                    <h3 class="rss-item-title">${item.title}</h3>
                    <div class="rss-item-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</div>
                    <p class="rss-item-excerpt">${item.description}</p>
                    <div class="rss-item-source">${item.source}</div>
                    <a href="${item.link}" target="_blank" class="read-more">Lire l'article complet</a>
                    <div class="fallback-notice"><i class="fas fa-info-circle"></i> Contenu de démonstration</div>
                `;
                
                rssGrid.appendChild(articleCard);
            });
            
            rssContainer.appendChild(rssGrid);
            
            // Afficher un message d'erreur subtil
            const errorMsg = document.createElement('div');
            errorMsg.className = 'rss-error-message';
            errorMsg.innerHTML = `
                <p><i class="fas fa-exclamation-circle"></i> Les flux RSS externes n'ont pas pu être chargés. Affichage d'articles de démonstration.</p>
            `;
            
            rssContainer.insertBefore(errorMsg, rssGrid);
        });
}

// Fonction pour charger le flux RSS de l'informatique quantique
function loadQuantumFeed() {
    const feedContainer = document.getElementById('quantum-advanced-feed');
    if (!feedContainer) return;
    
    // Ajouter un indicateur de chargement
    feedContainer.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-atom fa-spin"></i>
            <p>Chargement des articles...</p>
        </div>
    `;
    
    // Données statiques pour l'informatique quantique
    const quantumArticles = [
        {
            title: "IBM annonce un nouveau processeur quantique de 1000 qubits",
            date: new Date(2024, 3, 15),
            description: "IBM a franchi une étape majeure dans l'informatique quantique avec un processeur surpassant la barrière des 1000 qubits, ouvrant la voie à des applications pratiques en chimie quantique et en optimisation.",
            category: "research",
            link: "https://research.ibm.com/blog/quantum-computing"
        },
        {
            title: "Google démontre la suprématie quantique avec Sycamore",
            date: new Date(2024, 2, 22),
            description: "L'équipe de Google Quantum AI a démontré que leur processeur quantique peut résoudre en quelques minutes un problème qui prendrait des milliers d'années aux superordinateurs classiques les plus puissants.",
            category: "research",
            link: "https://quantumai.google/"
        },
        {
            title: "Microsoft lance Azure Quantum pour les entreprises",
            date: new Date(2024, 1, 8),
            description: "Microsoft démocratise l'accès à l'informatique quantique avec Azure Quantum, permettant aux entreprises d'expérimenter et de développer des applications quantiques sans matériel spécialisé.",
            category: "business",
            link: "https://azure.microsoft.com/en-us/solutions/quantum-computing/"
        },
        {
            title: "Le Quantum Machine Learning, nouvelle frontière de l'IA",
            date: new Date(2024, 2, 5),
            description: "Les chercheurs développent de nouveaux algorithmes quantiques qui pourraient révolutionner l'apprentissage automatique, permettant d'analyser des données massives à une vitesse inédite.",
            category: "research",
            link: "https://pennylane.ai/"
        },
        {
            title: "Formation gratuite à l'informatique quantique par MIT",
            date: new Date(2024, 0, 12),
            description: "Le MIT propose un cours en ligne gratuit sur les fondamentaux de l'informatique quantique, accessible à tous les développeurs souhaitant se former à cette technologie d'avenir.",
            category: "education",
            link: "https://ocw.mit.edu/courses/physics/8-04-quantum-physics-i-spring-2016/"
        },
        {
            title: "Les startups quantiques lèvent des fonds records",
            date: new Date(2024, 3, 3),
            description: "Le secteur de l'informatique quantique attire des investissements massifs, avec plusieurs startups dépassant le milliard de dollars de valorisation dans ce domaine en pleine expansion.",
            category: "business",
            link: "https://quantumcomputingreport.com/"
        },
        {
            title: "Cryptographie post-quantique : se préparer à l'ère quantique",
            date: new Date(2024, 1, 25),
            description: "Les experts en cybersécurité développent de nouveaux algorithmes de chiffrement résistants aux attaques d'ordinateurs quantiques qui menacent les systèmes cryptographiques actuels.",
            category: "research",
            link: "https://csrc.nist.gov/projects/post-quantum-cryptography"
        },
        {
            title: "Qiskit propose un nouveau cours pour débutants",
            date: new Date(2024, 0, 30),
            description: "IBM enrichit sa plateforme éducative Qiskit avec un cours spécialement conçu pour les développeurs sans expérience préalable en physique quantique.",
            category: "education",
            link: "https://qiskit.org/learn/"
        }
    ];
    
    // Vider le conteneur
    feedContainer.innerHTML = '';
    
    // Afficher les articles
    quantumArticles.forEach(article => {
        // Formatter la date
        const formattedDate = article.date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        // Créer la carte d'article
        const articleCard = document.createElement('div');
        articleCard.className = `feed-item ${article.category}`;
        
        // Générer une image de placeholder moderne
        const imageHtml = `<div class="feed-item-image">
            <img src="https://source.unsplash.com/300x200/?quantum,technology,${article.category}" alt="${article.title}">
        </div>`;
        
        // Ajouter le contenu de l'article
        articleCard.innerHTML = `
            ${imageHtml}
            <div class="feed-item-content">
                <div class="feed-item-meta">
                    <span class="feed-item-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
                    <span class="feed-item-category ${article.category}">${article.category}</span>
                </div>
                <h3 class="feed-item-title">${article.title}</h3>
                <p class="feed-item-excerpt">${article.description}</p>
                <a href="${article.link}" target="_blank" class="read-more">Lire l'article complet <i class="fas fa-external-link-alt"></i></a>
            </div>
        `;
        
        // Ajouter la carte au conteneur
        feedContainer.appendChild(articleCard);
    });
    
    // Message d'information
    const infoMessage = document.createElement('div');
    infoMessage.className = 'feed-info-message';
    infoMessage.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <p>Articles préchargés pour démonstration. Dans un environnement de production, ces articles seraient chargés depuis des sources externes.</p>
    `;
    feedContainer.insertBefore(infoMessage, feedContainer.firstChild);
    
    // Initialiser les filtres
    initFeedFilters();
}

// Initialiser les filtres de flux
function initFeedFilters() {
    const filterButtons = document.querySelectorAll('.feed-filters .filter-btn');
    const feedItems = document.querySelectorAll('.feed-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Activer le bouton sélectionné
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les éléments
            const filter = this.getAttribute('data-filter');
            
            feedItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Actualiser le flux quantique
    const refreshQuantumBtn = document.getElementById('refresh-quantum-feed');
    if (refreshQuantumBtn) {
        refreshQuantumBtn.addEventListener('click', loadQuantumFeed);
    }
}

// Charger les flux RSS au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    loadRssFeed();
    
    // Charger le flux RSS quantique si on est sur cet onglet
    const quantumTab = document.getElementById('quantum-tab');
    if (quantumTab) {
        const tabButton = document.querySelector('[data-tab="quantum"]');
        if (tabButton) {
            tabButton.addEventListener('click', function() {
                loadQuantumFeed();
            });
        }
    }
    
    // Gestion des onglets de veille technologique
    const tabButtons = document.querySelectorAll('.veille-tabs .tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Désactiver tous les onglets
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Activer l'onglet sélectionné
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
});

// Animation des éléments de la frise chronologique
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Option pour l'observateur d'intersection
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    // Fonction de callback lors de l'intersection
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // On arrête d'observer une fois que l'élément est visible
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Créer l'observateur
    const observer = new IntersectionObserver(callback, options);
    
    // Observer chaque élément de la timeline
    timelineItems.forEach(item => {
        observer.observe(item);
    });
} 