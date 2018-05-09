# Angular Material

## Install

`npm install --save @angular/material @angular/cdk`

## Elevation Helper

``` SCSS
@import '~@angular/material/theming';


.my-class {
  @include mat-elevation-transition;
  @include mat-elevation(2);

  &:active {
    @include mat-elevation(8);
  }
}
```

