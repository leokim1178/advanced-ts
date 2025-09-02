// enum이 의도한대로 동작하지 않는 경우

const Color = {
    Red: 'Red',
    Green: 'Blue',
    Blue: 'Green'
} as const;

enum ColorEnum {
    Red = 'Red',
    Green = 'Green',
    Blue = 'Blue'
}

function evilFunc(c: ColorEnum) {

}

// evilFunc('Red'); // 타입에러 발생

type ColorType = keyof typeof Color

function color(c: ColorType) {

}

color("Red"); // 타입에러 X
color(Color.Red); // ok
// enum 보다는 `as const` 방법이 나을 수 있다

function uppercase(str: string) {

}

function enumColor(c: ColorEnum) {
    uppercase(c)
}

color("Red")
enumColor(ColorEnum.Green)

