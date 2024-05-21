var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { OsuUser } from '../../domain/models/osuUser.js';
export const saveUserData = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield OsuUser.findOne({ userId });
    if (existingUser) {
        existingUser.data = data;
        existingUser.updatedAt = new Date();
        yield existingUser.save();
    }
    else {
        const newUser = new OsuUser({ userId, data });
        yield newUser.save();
    }
});
export const getUserData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield OsuUser.findOne({ userId });
});
