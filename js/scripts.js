// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// 네비게이션 바 스크롤 효과
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    navbar.style.padding = '0.7rem 0';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    navbar.style.padding = '1rem 0';
  }
});

// 슬라이드쇼 기능
document.addEventListener('DOMContentLoaded', function () {
  const slidesContainer = document.querySelector('.slideshow-container');
  if (!slidesContainer) return;
  
  const slidesWrapper = slidesContainer.querySelector('.slides-wrapper');
  const slides = slidesContainer.querySelectorAll('.slide');
  const prevBtn = slidesContainer.querySelector('.prev-btn');
  const nextBtn = slidesContainer.querySelector('.next-btn');
  const dots = slidesContainer.querySelectorAll('.dot');

  let currentIndex = 0;
  const totalSlides = slides.length;

  // 슬라이드 업데이트 함수
  function updateSlide(index) {
    // 페이드 효과 추가
    slidesWrapper.style.opacity = 0;
    
    setTimeout(() => {
      currentIndex = index;
      slidesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // 도트 업데이트
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
      
      // 페이드 인
      slidesWrapper.style.opacity = 1;
    }, 300);
  }

  // 자동 슬라이드 타이머
  let slideInterval = setInterval(() => {
    let nextIndex = (currentIndex + 1) % totalSlides;
    updateSlide(nextIndex);
  }, 6000);

  // 다음 버튼 클릭 이벤트
  nextBtn.addEventListener('click', function () {
    clearInterval(slideInterval);
    let nextIndex = (currentIndex + 1) % totalSlides;
    updateSlide(nextIndex);

    // 타이머 재설정
    slideInterval = setInterval(() => {
      nextIndex = (currentIndex + 1) % totalSlides;
      updateSlide(nextIndex);
    }, 6000);
  });

  // 이전 버튼 클릭 이벤트
  prevBtn.addEventListener('click', function () {
    clearInterval(slideInterval);
    let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide(prevIndex);

    // 타이머 재설정
    slideInterval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % totalSlides;
      updateSlide(nextIndex);
    }, 6000);
  });

  // 도트 클릭 이벤트
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
      clearInterval(slideInterval);
      updateSlide(index);

      // 타이머 재설정
      slideInterval = setInterval(() => {
        let nextIndex = (currentIndex + 1) % totalSlides;
        updateSlide(nextIndex);
      }, 6000);
    });
  });

  // 터치 이벤트 (모바일용)
  let touchStartX = 0;
  let touchEndX = 0;

  slidesContainer.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(slideInterval);
  }, false);

  slidesContainer.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;

    if (touchEndX < touchStartX - 50) {
      // 왼쪽으로 스와이프 (다음 슬라이드)
      let nextIndex = (currentIndex + 1) % totalSlides;
      updateSlide(nextIndex);
    } else if (touchEndX > touchStartX + 50) {
      // 오른쪽으로 스와이프 (이전 슬라이드)
      let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlide(prevIndex);
    }

    // 타이머 재설정
    slideInterval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % totalSlides;
      updateSlide(nextIndex);
    }, 6000);
  }, false);

  // 요소 등장 애니메이션
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.case-card, .value-card, .vision-card, .business-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if(elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // 초기 상태 설정
  document.querySelectorAll('.case-card, .value-card, .vision-card, .business-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // 스크롤 이벤트에 애니메이션 함수 연결
  window.addEventListener('scroll', animateOnScroll);
  
  // 초기 로드 시 실행
  animateOnScroll();
  
  // 초기 슬라이드 설정
  slidesWrapper.style.opacity = 1;
  updateSlide(0);
});