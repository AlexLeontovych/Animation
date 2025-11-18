gsap.registerPlugin(SplitText);

gsap.set(".background__pyramids", { filter: "brightness(1)" });
gsap.set(".background__firework-first, .background__firework-second, .background__firework-third, .background__firework-fourth", { filter: "brightness(1)" });
gsap.set(".background__left-lightning, .background__right-lightning, .background__right-second", { filter: "brightness(1)" });

const text = new SplitText('.main__info-block-text-title', { type: 'words' });

 introAnimations = gsap.timeline()
.from(text.words, { autoAlpha: 0, y: 50, ease: "power1.out", duration: 0.75, stagger: {each: 0.09 }}, ">") 
.to(".background__pyramids", { filter: "brightness(1.2)", ease: "sine.inOut", yoyo: true, repeat: -1 }, "<")
.to(".background__left-lightning, .background__right-lightning, .background__right-second", { filter: "brightness(2)", duration: 1, ease: "sine.inOut", yoyo: true, repeat: -1 }, "<")

lightningIntroAnimations = gsap.timeline()
.from('.background__left-lightning', { autoAlpha: 0, duration: 1, ease: 'power2.inOut' })
.from('.background__right-lightning', { autoAlpha: 0, duration: 1, ease: 'power2.inOut' })
.from('.background__right-second', { autoAlpha: 0, duration: 1, ease: 'power2.inOut' })
.add(() => lightningSwayAnimations.play())

fireworkAnimations = gsap.timeline({repeat: -1, repeatDelay: 2.75})
.fromTo('.background__firework-first, .background__firework-second, .background__firework-third, .background__firework-fourth', 
  { autoAlpha: 0, scale: 0, y: 200, filter: "brightness(1)" }, 
  { autoAlpha: 1, scale: 1, y: 0, filter: "brightness(2)", duration: 1, ease: 'power2.inOut', stagger: 0.35 })
.to('.background__firework-first,.background__firework-second,.background__firework-third,.background__firework-fourth', 
  { autoAlpha: 0, filter: "brightness(1)", duration: 1, ease: 'power2.Out', stagger: 0.35 }, "<+.75")


lightningSwayAnimations = gsap.timeline({ repeat: -1, ease: 'sine.inOut', paused: true, yoyo: true })
.to('.background__left-lightning', { rotation: -8, duration: 2, ease: 'sine.inOut', transformOrigin: 'bottom right' })
.to('.background__right-lightning', { rotation: 6, duration: 2.5, ease: 'sine.inOut', transformOrigin: 'bottom left' }, "<+.25")
.to('.background__right-second', { rotation: -6, duration: 2.2, ease: 'sine.inOut', transformOrigin: 'bottom left' }, "<+.4")