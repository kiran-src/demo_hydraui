// shared/animations/dashboard.animations.ts
import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
    stagger,
    animateChild
  } from '@angular/animations';
  
  export const fadeInOut = trigger('fadeInOut', [
    state('void', style({
      opacity: 0,
      transform: 'translateY(20px)'
    })),
    transition(':enter', [
      animate('300ms ease-out', style({
        opacity: 1,
        transform: 'translateY(0)'
      }))
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({
        opacity: 0,
        transform: 'translateY(20px)'
      }))
    ])
  ]);
  
  export const listAnimation = trigger('listAnimation', [
    transition('* <=> *', [
      query(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        stagger('50ms', [
          animate('300ms ease-out', style({ 
            opacity: 1, 
            transform: 'translateY(0)' 
          }))
        ])
      ], { optional: true })
    ])
  ]);
  
  export const cardAnimation = trigger('cardAnimation', [
    state('void', style({
      opacity: 0,
      transform: 'scale(0.95)'
    })),
    transition(':enter', [
      animate('300ms ease-out', style({
        opacity: 1,
        transform: 'scale(1)'
      }))
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({
        opacity: 0,
        transform: 'scale(0.95)'
      }))
    ])
  ]);
  
  export const chartAnimation = trigger('chartAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      query('.chart-element', [
        style({ opacity: 0, transform: 'scale(0.8)' })
      ], { optional: true }),
      animate('300ms ease-out', style({ opacity: 1 })),
      query('.chart-element', [
        stagger('100ms', [
          animate('300ms ease-out', style({ 
            opacity: 1, 
            transform: 'scale(1)' 
          }))
        ])
      ], { optional: true })
    ])
  ]);
  
  export const routeAnimation = trigger('routeAnimation', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0 })
      ], { optional: true }),
      query(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ opacity: 1 }))
      ], { optional: true })
    ])
  ]);