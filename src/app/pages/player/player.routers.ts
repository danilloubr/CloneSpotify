import { Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { PlayerComponent } from "./player.component";

export const PlayerRotas: Routes = [
    {
        path: "",
        component: PlayerComponent,
        children: [
            {path: "home",
            component: HomeComponent
            }
        ]

    }
]