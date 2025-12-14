interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

type Shape = Square | Rectangle;

// 각각 함수로 명시하지 않고 이렇게 discriminated Union 타입으로 정해놓으면 하나의 파라미터로 처리가 가능하다

function area(shape: Shape) {
    if (shape.kind === "square") {
        return shape.size * shape.size;
    } else {
        return shape.width * shape.height;
    }
}
