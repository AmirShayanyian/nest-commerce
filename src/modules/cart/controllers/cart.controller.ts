import { Controller } from "@nestjs/common";
import { ControllerName } from "src/common/enums/controller.enum";

@Controller(ControllerName.Cart)
export class CartController{
    constructor(){}
}