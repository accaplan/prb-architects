import React, { Component } from 'react'
import { Link } from "gatsby";
import { motion } from "framer-motion";
import Img from "gatsby-image";
// import Flickity from "flickity";
import { isBrowser } from "react-device-detect"
import wheel from "wheel"
import normalizeWheel from "normalize-wheel"

if (typeof window !== 'undefined') {
  const Flickity = require('flickity');
}

class HomeCarousel extends Component {
  state = { Flickity: null };

  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      const Flickity = require('flickity');
      this.state.Flickity = Flickity;
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      // Play with this value to change the speed
      let tickerSpeed = 2;

      let flickity = null;
      const slideshowEl = document.querySelector('.js-slideshow');

      const update = () => {

        if (flickity.slides) {
          // flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
          // flickity.integratePhysics();
          // flickity.selectedIndex = flickity.dragEndRestingSelect();
          flickity.updateSelectedSlide();
          flickity.settle(flickity.x);
          
          // wheel.addWheelListener(flickity.element, event => {
          //   const wheelNormalized = normalizeWheel(event);
          //   const direction = wheelNormalized.spinX * 100;
          //   direction > 0 ? range.increase(direction) : range.decrease(direction);
          //   flickity.startAnimation();
          // })
        }
        window.requestAnimationFrame(update);
      };
      
      flickity = new this.state.Flickity(slideshowEl, {
        autoPlay: false,
        prevNextButtons: true,
        pageDots: false,
        draggable: true,
        wrapAround: true,
        freeScroll: true,
        freeScrollFriction: 0.085,
        cellAlign: 'center'
      });
      // flickity.x = 0;

      wheel.addWheelListener(slideshowEl, event => {
        const wheelNormalized = normalizeWheel(event);
        flickity.applyForce(-wheelNormalized.pixelY / 15);
        flickity.startAnimation();
        flickity.dragEnd();
    });

      // slideshowEl.addEventListener('mouseenter', play, false);
      // slideshowEl.addEventListener('focusin', play, false);
      // slideshowEl.addEventListener('mouseleave', play, false);
      // slideshowEl.addEventListener('focusout', play, false);

      // flickity.on('dragStart', () => {
      //   isPaused = true;
      // });

      // update();
    }
  }

  
  render() {
    return (
      <div className="slideshow js-slideshow">
        {this.props.slides.map(({ node }, i) => {
          return (
            <div className="slide" key={i}>
              <Link to={`/work/${ node.slug }`} className="block h-full slide__link">
                <figure className="h-full">
                  <div className="flex flex-wrap relative h-full xl:pb-6">
                    <div className="flex-1 h-full">
                      {/* <Img fluid={node.featuredImageBig.fluid} className="w-full max-w-full object-cover mb-1 h-full scroller-image" /> */}
                      <div className="overflow-hidden mb-1 pb-0">
                        <Img fluid={node.featuredImageBig.fluid} className="h-full carousel-img w-auto slide__img pb-0 -mb-2 hidden md:block" />
                        <Img fluid={node.featuredImageMobile.fluid} className="h-full carousel-img w-auto slide__img pb-0 -mb-2 block md:hidden" />
                      </div>
                      <figcaption className="flex text-lg md:text-xl md:px-0 items-center">  
                        <span className="block">{ node.title }</span>
                        <span className="block ml-auto text-sm">{ node.category.title }</span>
                      </figcaption>
                    </div>
                    <div className="w-auto h-full ml-px md:ml-1">
                      <span className="flex flex-wrap text-sm md:text-base leading-none items-center text-orient-down pl-2">
                        <span className="block text-2xs mr-px mb-1">PRB</span>
                        <span className="block leading-none">{ node.projectCode }</span>
                      </span>
                    </div>
                  </div>
                </figure>
              </Link>
            </div>
          )
        })}
        {this.props.slides.length < 4 && (
          <>
            {this.props.slides.map(({ node }, i) => {
              return (
                <div className="slide" key={i}>
                  <Link to={`/work/${ node.slug }`} className="block h-full slide__link">
                    <figure className="h-full">
                      <div className="flex flex-wrap relative h-full xl:pb-6">
                        <div className="flex-1 h-full">
                          {/* <Img fluid={node.featuredImageBig.fluid} className="w-full max-w-full object-cover mb-1 h-full scroller-image" /> */}
                          <div className="overflow-hidden mb-1 pb-0">
                            <Img fluid={node.featuredImageBig.fluid} className="h-full carousel-img w-auto slide__img pb-0 -mb-2" />
                          </div>
                          <figcaption className="flex text-lg md:text-xl md:px-0 items-center">  
                            <span className="block">{ node.title }</span>
                            <span className="block ml-auto text-sm">{ node.category.title }</span>
                          </figcaption>
                        </div>
                        <div className="ml-px md:ml-1">
                          <span className="flex flex-wrap text-sm md:text-base leading-none items-center text-orient-down pl-2">
                            <span className="block text-2xs mr-px mb-1">PRB</span>
                            <span className="block leading-none">{ node.projectCode }</span>
                          </span>
                        </div>
                      </div>
                    </figure>
                  </Link>
                </div>
              )
            })}
          </>
        )}
      </div>
    )
  }
}

export default HomeCarousel
