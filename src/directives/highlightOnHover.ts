import { Directive, DirectiveBinding } from 'vue';

    interface HighlightElement extends HTMLElement {
      _overlay?: HTMLDivElement;
      _onMouseEnter?: (event: MouseEvent) => void;
      _onMouseLeave?: (event: MouseEvent) => void;
    }

    const highlightOnHover: Directive<HighlightElement, any> = {
      mounted(el: HighlightElement, binding: DirectiveBinding) {
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.zIndex = '1000'; // Ensure it's on top
        overlay.style.border = binding.value?.borderColor || '3px solid limegreen'; // Default green, customizable
        overlay.style.backgroundColor = binding.value?.backgroundColor || 'rgba(0, 255, 0, 0.1)'; // Customizable
        overlay.style.pointerEvents = 'none'; // So it doesn't interfere with mouse events on the element itself
        overlay.style.boxSizing = 'border-box';
        overlay.style.borderRadius = '4px'; // Optional: adds rounded corners to the overlay

        el._overlay = overlay;

        el._onMouseEnter = () => {
          if (!el._overlay) return;
          const rect = el.getBoundingClientRect();
          
          // Adjust for scroll position
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

          el._overlay.style.left = `${rect.left + scrollLeft}px`;
          el._overlay.style.top = `${rect.top + scrollTop}px`;
          el._overlay.style.width = `${rect.width}px`;
          el._overlay.style.height = `${rect.height}px`;
          
          document.body.appendChild(el._overlay);
        };

        el._onMouseLeave = () => {
          if (el._overlay && el._overlay.parentNode) {
            el._overlay.parentNode.removeChild(el._overlay);
          }
        };

        el.addEventListener('mouseenter', el._onMouseEnter);
        el.addEventListener('mouseleave', el._onMouseLeave);
      },
      unmounted(el: HighlightElement) {
        if (el._onMouseEnter) {
          el.removeEventListener('mouseenter', el._onMouseEnter);
        }
        if (el._onMouseLeave) {
          el.removeEventListener('mouseleave', el._onMouseLeave);
        }
        if (el._overlay && el._overlay.parentNode) {
          el._overlay.parentNode.removeChild(el._overlay);
        }
        delete el._overlay;
        delete el._onMouseEnter;
        delete el._onMouseLeave;
      }
    };

    export default highlightOnHover;