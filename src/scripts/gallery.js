export class UniversalGallery {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.options = {
      scrollContainerClass: '.scrollMain',
      trackClass: '.scrollTrack',
      itemClass: '.galleryPhoto',
      prevBtnSelector: '#prev',
      nextBtnSelector: '#next',
      horizontal: true,
      gap: 10,
      ...options
    };

    // Инициализация элементов
    this.scrollContainer = this.container.querySelector(this.options.scrollContainerClass);
    this.track = this.container.querySelector(this.options.trackClass);
    this.items = Array.from(this.container.querySelectorAll(this.options.itemClass));
    this.prevBtn = this.container.querySelector(this.options.prevBtnSelector);
    this.nextBtn = this.container.querySelector(this.options.nextBtnSelector);

    this.currentIndex = 0;
    this.itemSize = this.options.horizontal 
      ? this.items[0].clientWidth + this.options.gap 
      : this.items[0].clientHeight + this.options.gap;

    this.init();
  }

  init() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.scrollToItem(this.currentIndex - 1));
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.scrollToItem(this.currentIndex + 1));
    }

    if (this.scrollContainer) {
      this.scrollContainer.addEventListener('scroll', this.handleScroll.bind(this));
    }

    window.addEventListener('resize', () => {
      this.itemSize = this.options.horizontal 
        ? this.items[0].clientWidth + this.options.gap 
        : this.items[0].clientHeight + this.options.gap;
      this.scrollToItem(this.currentIndex);
    });
  }

  scrollToItem(index) {
    if (index < 0) index = 0;
    if (index >= this.items.length) index = this.items.length - 1;

    this.currentIndex = index;
    const scrollPosition = index * this.itemSize;

    if (this.scrollContainer) {
      this.scrollContainer.scrollTo({
        [this.options.horizontal ? 'left' : 'top']: scrollPosition,
        behavior: 'smooth'
      });
    }
  }

  handleScroll() {
    if (!this.scrollContainer) return;
    
    const scrollPosition = this.options.horizontal 
      ? this.scrollContainer.scrollLeft 
      : this.scrollContainer.scrollTop;
      
    this.currentIndex = Math.round(scrollPosition / this.itemSize);
  }
}