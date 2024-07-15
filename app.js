


import { lerp } from "./utils.js";
import { createProjects, createBlogposts } from "./projects.js";

const main = document.querySelector('main');
const video = document.querySelector('video');
const videoSection = document.querySelector('#video');

createProjects();
createBlogposts();

main.addEventListener('scroll', () => {
    animateVideo()
})

// Video

const headerLeft = document.querySelector('.text__header__left');
const headerRight = document.querySelector('.text__header__right');

function animateVideo(){
    let {bottom} = videoSection.getBoundingClientRect();
    let scale = 1 - ((bottom - window.innerHeight) * .0005);
    scale = scale < .2 ? .2 : scale > 1 ? 1 : scale;
    video.style.transform = `scale(${scale})`;

    // Text transformation
    let textTrans = bottom - window.innerHeight;
    textTrans = textTrans < 0 ? 0 : textTrans;
    headerLeft.style.transform = `translateX(${-textTrans}px)`;
    headerRight.style.transform = `translateX(${textTrans}px)`;
} 

// Projects

const projectsSticky = document.querySelector('.projects__sticky');
const projectSlider = document.querySelector('.projects__slider');

let projectTargetX = 0;
let projectCurrentX = 0;

let percentages = {
    small: 700,
    medium: 300,
    large: 100
}

let limit = window.innerWidth <= 600 ? percentages.small :
            window.innerWidth <= 1100 ? percentages.medium :
            percentages.large

function setLimit(){
    limit = window.innerWidth <= 600 ? percentages.small :
            window.innerWidth <= 1100 ? percentages.medium :
            percentages.large
}

window.addEventListener('resize', setLimit);

function animateProjects(){
    let offsetTop = projectsSticky.parentElement.offsetTop;
    let percentage = ((main.scrollTop - offsetTop) / window.innerHeight) * 100;
    percentage = percentage < 0 ? 0 : percentage > limit ? limit : percentage;
    projectTargetX = percentage;
    projectCurrentX = lerp(projectCurrentX, projectTargetX, .1);
    projectSlider.style.transform = `translate3d(${-(projectCurrentX)}vw, 0 , 0)`;
}

// Post animation
const blogSection = document.getElementById('blog');
const blogPosts = [...document.querySelectorAll('.post')];

function scrollBlogPosts(){
    let blogSectionTop = blogSection.getBoundingClientRect().top;
    for(let i = 0; i < blogPosts.length; i++){
        if(blogPosts[i].parentElement.getBoundingClientRect().top <= 1){
            // +1 to account for the first BLOG title div
        
            let offset = (blogSectionTop + (window.innerHeight * (i + 1))) * .0005;
            offset = offset < -1 ? -1 : offset >= 0 ? 0 : offset;
            if( i == 1) console.log(offset)
            blogPosts[i].style.transform = `scale(${1 + offset})`
        }
    }
}

// Circle animation
const circleSection = document.getElementById('circle__section');
const circle = document.querySelector('.circle');

function scrollCircle(){
    let {top} = circleSection.getBoundingClientRect();
    let scaleTop = Math.abs(top);
    let scale = (scaleTop / window.innerHeight)
    scale = scale < 0 ? 0 : scale > 1 ? 1 : scale;
    if(top <= 0){
        circle.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }else{
        circle.style.transform = `translate(-50%, -50%) scale(${0})`;
    }
}

// Dicover text animation
const dContainer = document.querySelector('.discover__container')
const leftText = document.querySelector('.text__left');
const rightText = document.querySelector('.text__right');

function scrollDiscover(){
    let {bottom} = dContainer.getBoundingClientRect();
    let textTrans = bottom - window.innerHeight;
    textTrans = textTrans < 0 ? 0 : textTrans
    leftText.style.transform = `translateX(${-textTrans}px)`
    rightText.style.transform = `translateX(${textTrans}px)`
}


// Text reveal

const textReveals = [...document.querySelectorAll('.text__reveal')];

let callback = (entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            console.log(entry);
            [...entry.target.querySelectorAll('span')].forEach((span, idx) => {
                setTimeout(() => {
                    span.style.transform = `translateY(0)`;
                }, (idx+1) * 50)
            })
        }
    })
})

let options = {
    rootMargin: '0px',
    threshold: 1.0
}

let observer = new IntersectionObserver(callback, options);

textReveals.forEach(text => {
    let string = text.innerText;
    let html = '';
    for(let i = 0; i < string.length; i++){
        html += `<span>${string[i]}</span>`;
    }
    text.innerHTML = html
    observer.observe(text);
})


function animate(){
    animateProjects();
    requestAnimationFrame(animate)
}

main.addEventListener('scroll', () => {
    scrollBlogPosts();
    scrollCircle();
    scrollDiscover()
})

animate()




const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  
  function firstPageAnim() {
    var tl = gsap.timeline();
  
    tl.from("#nav", {
      y: "-10",
      opacity: 0,
      duration: 1,
      ease: Expo.easeInOut,
    })
      .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 1,
        stagger: 0.2,
      })
      .to(".boundingelem1", {
        y: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
        stagger: 0.2,
      })
      .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
      });
  }
  
  var timeout;
  
  function circleMouseSkew() {
    var xscale = 1;
    var yscale = 1;
  
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function (dets) {
      clearTimeout(timeout);
  
      var xdiff = dets.clientX - xprev;
      var ydiff = dets.clientY - yprev;
      xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
      yscale = gsap.utils.clamp(0.8, 1.2, ydiff);
  
      xprev = dets.clientX;
      yprev = dets.clientY;
  
      circleMouseFollower(xscale, yscale);
  
      timeout = setTimeout(function () {
        document.querySelector(
          "#minicircle"
        ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
      }, 100);
    });
  }
  
  circleMouseSkew();
  
  function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
  }
  
  circleMouseFollower();
  firstPageAnim();
  
  document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot),
      });
    });
  });
  