/**
 * Triangle path bezier curves
 * version: 0.9
 * converted from absolute coordinates to
 * coordinates based on a triangle defined by:
 * [.5 .5], [0,1], [1,1]
 * 
 * The elements describe a bezier where one end 
 * begins at a point 1/3rd or 2/3rds on a side
 * and ends 1/3rd or 2/3rds on a side. 
 * Each of these segments is designated by two 
 * identifiers ( 1 - 6 ) to indicate the start and
 * stop points where, starting at the bottom of the 
 * triangle one third from the corner and moving counter-
 * clockwise around the triangle are numbered 1 - 6.
 * So, seg[1,3] would be the first point 1/3rd of the way on the 
 * bottom side from the lower left corner to the first point 
 * 1/3rd of the way up from the bottom right corner on the right 
 * side.
 *                    X
 *                   / \
 *                  5   4
 *                 /     \
 *                6       3
 *               /         \
 *              /--1----2---\
 * 
 * The points object defines the bezier curve connecting those
 * points. 
 * [px1,py1] is the anchor point of the first end.
 * [px2,py2] is the anchor point of the other end.
 * [cx1,cy1] is the first control point.
 * [cx2,cy2] is the other control point.
 * 
 * https://en.wikipedia.org/wiki/B%C3%A9zier_curve
 * 
 * These corrdinates assume an isoscoles triangle ( *ideally an equilateral triangle*) sitting with
 * one side parallel to the x axis. For an non-equilateral triangle the odd-length side should be 
 * sitting on the x axis.
 * 
 * To use these coordinates, multiply by the value of the bottom of 
 * your triangle for the y component and the width of your triangle for the 
 * x component.  
 */
const triCenter = {
    x: .5,
    y: 0.66666667
}

const combos = [
    {
        seg:[1,2],
        points:{
            px1:0.3333333333,
            py1:1,
            px2: 0.6666666667,
            py2: 1,
            cx2:0.675,
            cy2:0.75,
            cx1:0.3333333333,
            cy1:0.7211538462
        },
    },
    {
        seg:[1,3],
        points:{
            px1:0.3333333333,
            py1:1,
            px2: 0.8416666667,
            py2: 0.6634615385,
            cx2:0.625,
            cy2:0.75,
            cx1:0.3583333333,
            cy1:0.75
        },        
    },
    {
        seg:[1,4],
        points:{
            px1:0.3333333333,
            py1:1,
            px2: 0.6833333333,
            py2: 0.3461538462,
            cx2:0.25,
            cy2:0.5,
            cx1:0.3583333333,
            cy1:0.75                    
        },
    },
    {
        seg:[1,5],
        points:{
            px1:0.3333333333,
            py1:1,
            px2: 0.325,
            py2: 0.3365384615,
            cx2:0.7416666667,
            cy2:0.4903846154,
            cx1:0.3583333333,
            cy1:0.75                    
        },
    },
    {
        seg:[1,6],
        points:{
            px1:0.3333333333,
            py1:1,
            px2:0.1666666667,
            py2:0.6538461538,
            cx1:0.3583333333,
            cy1:0.75,
            cx2:0.3583333333,
            cy2:0.75
        },
    },
    {
        seg:[3,4], 
        points:{
            px1: 0.823425,
            py1: 0.6534038462,
            px2: 0.6567583333,
            py2: 0.3203173077,
            cx1: 0.6141333333,
            cy1: 0.7928269231,
            cx2: 0.46495,
            cy2: 0.4369903846
        },
    },
    {
        seg:[3,5], //1-3 rotated 120
        points:{
            px1: 0.823425,
            py1: 0.6534038462,
            px2: 0.3166666667,
            py2: 0.3137211538,
            cx1: 0.6232833333,
            cy1: 0.7534230769,
            cx2: 0.48995,
            cy2: 0.4869615385        
        },        
    },
    {
        seg:[3,6],
        points:{
            px1: 0.823425,
            py1: 0.6534038462,
            px2: 0.157675,
            py2: 0.6305865385,
            cx1: 0.6232833333,
            cy1: 0.7534230769,
            cx2: 0.4898166667,
            cy2: 0.9866826923        
        },
    },
    {
        seg:[3,2],
        points:{
            px1: 0.823425,
            py1: 0.6534038462,
            px2: 0.64695,
            py2: 0.9930288462,
            cx1: 0.6232833333,
            cy1: 0.7534230769,
            cx2: 0.6232833333,
            cy2: 0.7534230769        
        },
    },
    {
        seg:[5,6],
        points:{
            px1: 0.3182416667,
            py1: 0.3369807692,
            px2: 0.151575,
            py2: 0.6700673077,
            cx1: 0.5275333333,
            cy1: 0.4764038462,
            cx2: 0.33505,
            cy2: 0.8033942308
        },
    },
    {
        seg:[5,2],
        points:{
            px1: 0.3182416667,
            py1: 0.3369807692,
            px2: 0.6339916667,
            py2: 1.013644231,
            cx1: 0.4933833333,
            cy1: 0.4869615385,
            cx2: 0.7351833333,
            cy2: 0.5037019231
        },
    },
    {
        seg:[5,4],
        points:{
            px1: 0.3182416667,
            py1: 0.3369807692,
            px2: 0.6613833333,
            py2: 0.3435096154,
            cx1: 0.4933833333,
            cy1: 0.4869615385,
            cx2: 0.4933833333,
            cy2: 0.4869615385
        },
    },
    {
        seg:[2,4],
        points:{
            px1: 0.6666666667,
            py1: 1,
            px2: 0.675,
            py2: 0.3365384615,
            cx1: 0.6416666667,
            cy1: 0.75,
            cx2: 0.4916666667,
            cy2: 0.4807692308
        },
    },
    {
        seg:[4,6],
        points:{
            px1: 0.6567583333,
            py1: 0.3203173077,
            px2: 0.154625,
            py2: 0.6437211538,
            cx1: 0.4816166667,
            cy1: 0.4703076923,
            cx2: 0.35455,
            cy2: 0.7548076923
        },
    },
    {
        seg:[6,2],
        points:{
            px1: 0.151575,
            py1: 0.6700673077,
            px2: 0.645375,
            py2: 1.010125,
            cx1: 0.3517166667,
            cy1: 0.7700769231,
            cx2: 0.6287833333,
            cy2: 0.7548076923
        },
    },
];
export { triCenter};
export default combos;
