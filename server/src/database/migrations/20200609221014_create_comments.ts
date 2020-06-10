import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('comments', table => {
        table.increments('id').primary;
        table.string('client_name').notNullable();
        table.text('comment', 'longtext').notNullable();
        table.integer('stars');
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('comments')
}

