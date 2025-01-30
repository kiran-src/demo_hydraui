import { trigger, transition, style, animate } from '@angular/animations';

export const animations = [
  trigger('fadeSlideInOut', [
    transition(':enter', [
      style({ 
        opacity: 0, 
        transform: 'translateY(20px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }),
      animate('300ms ease-out', style({ 
        opacity: 1, 
        transform: 'translateY(0)',
        backgroundColor: 'rgba(0, 0, 0, 0)'
      }))
    ]),
    transition(':leave', [
      animate('300ms ease-in', style({ 
        opacity: 0, 
        transform: 'translateY(20px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }))
    ])
  ]),
  trigger('cardAnimation', [
    transition(':enter', [
      style({ 
        opacity: 0, 
        transform: 'scale(0.95)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }),
      animate('300ms ease-out', style({ 
        opacity: 1, 
        transform: 'scale(1)',
        backgroundColor: 'rgba(0, 0, 0, 0)'
      }))
    ])
  ])
];