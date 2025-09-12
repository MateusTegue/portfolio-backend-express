import blog from "../../models/blog.js";

// elminar blog de la base de datos
const deleteBlog = async (id) => {
    try {
        const deletedBlog = await blog.findByIdAndDelete(id);
        return deletedBlog;
    } catch (error) {
        throw new Error("Error al eliminar el blog: " + error.message);
    }
};

export default deleteBlog;
