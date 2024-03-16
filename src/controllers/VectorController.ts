interface IVectorController {
  normDirVec(mousePos: IBaseVec, ballPos: IBaseVec): IBaseVec;
}

interface IBaseVec {
  x: number;
  y: number;
}

export class VectorController implements IVectorController {
  normDirVec(mousePos: IBaseVec, ballPos: IBaseVec): IBaseVec {
    const dirVec = this.#dirVec(mousePos, ballPos);

    return this.#normalizeDirVec(dirVec, this.#distance(dirVec));
  }

  #dirVec(mousePos: IBaseVec, ballPos: IBaseVec): IBaseVec {
    const dirX = mousePos.x - ballPos.x;
    const dirY = mousePos.y - ballPos.y;

    return { x: dirX, y: dirY };
  }

  // Calculate the direction vector from circle center to mouse
  #distance(dirVec: IBaseVec): number {
    const distance = Math.sqrt(dirVec.x * dirVec.x + dirVec.y * dirVec.y);

    return distance;
  }

  #normalizeDirVec(dirVec: IBaseVec, distance: number): IBaseVec {
    const vx = dirVec.x / distance;
    const vy = dirVec.y / distance;

    return { x: vx, y: vy };
  }
}
