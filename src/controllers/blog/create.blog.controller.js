import  createBlog  from '../../repository/blog/create.blog.repository.js';

const createBlogController = async (req, res) => {
    try {
        await createBlog(req, res);
    } catch (error) {
        res.status(500).json({ msg: "Error al crear el blog", error });
    }
}

export default createBlogController