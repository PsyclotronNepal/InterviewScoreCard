<?php

/**
 * Created by Reliese Model.
 * Date: Sat, 02 Jun 2018 17:36:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Mark
 *
 * @property int $id
 * @property float $score
 * @property string $remarks
 * @property int $interviewee_id
 * @property int $interviewer_id
 * 
 * @property \App\Models\Interviewee $interviewee
 * @property \App\Models\User $user
 *
 * @package App\Models
 */
class Mark extends Eloquent
{
	public $timestamps = false;

	protected $casts = [
		'score' => 'float',
		'interviewee_id' => 'int',
		'interviewer_id' => 'int'
	];

	protected $fillable = [
		'score',
        'remarks',
        'interviewee_id',
        'interviewer_id'
	];

	public function interviewee()
	{
		return $this->belongsTo(\App\Models\Interviewee::class);
	}

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class, 'interviewer_id');
	}
}
