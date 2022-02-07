import { CompileMetadataResolver } from "@angular/compiler";
import { createReducer, on } from "@ngrx/store";
import { Todo } from "./models/todo.model";
import { crear, editar, toggle, borrar, toggleAll, borrarTodas } from './todo.actions';


export const estadoInicial: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a thanos'),
    new Todo('Comprar traje de iron man'),
    new Todo('Hola Mundo'),
];


const _todoReducer = createReducer(estadoInicial, 
    on(crear, (state, {texto}) => [...state, new Todo(texto)] ),
    on(borrar, (state, {id}) => state.filter(todo => todo.id != id )),
    on(borrarTodas, (state) => state.filter(todo => todo.completado === false)),
    on(toggleAll, (state, {completado}) => {
        return state.map( todo => {
            return {
                ...todo,
                completado: completado
            }
        })
    }),
    on(toggle, (state, {id}) => {
        return state.map( todo => {
            if( id === todo.id){
                return {
                    ...todo,
                    completado: !todo.completado
                }
            }else{
                return todo
            }
        })
    } ),
    on( editar, (state, {id, texto}) => {
        return state.map( todo => {

            if(todo.id === id){
                return {
                    ...todo,
                    texto: texto
                }
            }else{
                return todo
            }
        })
    }),
    );


export function todoReducer (state, action){
    return _todoReducer(state,action);
}