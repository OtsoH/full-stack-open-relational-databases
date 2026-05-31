module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addConstraint('reading_lists', {
      fields: ['blog_id', 'user_id'],
      type: 'unique',
      name: 'unique_blog_user_reading_list'
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint('reading_lists', 'unique_blog_user_reading_list')
  }
}
